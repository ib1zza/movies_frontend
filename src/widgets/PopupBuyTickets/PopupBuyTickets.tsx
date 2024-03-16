import s from "./PopupBuyTickets.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import {useAppDispatch, useAppSelector} from "@app/Store/config/store.ts";
import {HallConfiguration, PlaceWithCoords, Screening, ProcessOrderData, ScreeningInfo} from "@shared/types/types.ts";
import {reservationActions} from "@app/Store/config/slices/reservationSlice.ts";
import Button from "@shared/ui/Button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faTicketSimple} from "@fortawesome/free-solid-svg-icons";
import {reservePlaces} from "@shared/API/CinemaOrdersService.ts";
import {
    formatPlaces,
    formatPlacesCount
} from "./utils/format";

interface PopupBuyTicketsProps {
    className?: string;
}

interface FirstStepProps {
    selectedScreening: Screening,
    hallConfiguration: HallConfiguration
}

const FirstStep = ({selectedScreening, hallConfiguration}: FirstStepProps) => {
    const {
        occupiedSeats,
        selectedPlaces,
        totalPrice,
        error
    } = useAppSelector(state => state.reservation)
    const {userData, machineId, sessionId} = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    function handleBuyTickets() {
        reservePlaces(selectedScreening?.screening_id || '', selectedPlaces, userData?.email || '', sessionId, machineId).then((res) => {
            console.log(res)
            if (res) dispatch(reservationActions.setOrderProcessData(res))
        });
    }

    const {places, totalRows, totalColumns} = formatPlaces(hallConfiguration.place);

    function handleSelectPlace(place: PlaceWithCoords) {
        dispatch(reservationActions.selectPlace(place));
    }


    return (
        <>
            <div className={s.placesContainer}>
                <div className={s.screen}></div>
                <div className={s.places}>
                    {places && Object.keys(places).map((row) => (
                        <div className={s.rowContainer}>
                            <span className={s.rowContainerNumber}>{+row}</span>
                            <div key={row} className={s.placeRow}
                                 style={{gridTemplateColumns: `repeat(${totalColumns}, 1fr)`}}>
                                {places[row].map((seat) => (
                                    <div
                                        key={seat.seat}
                                        onClick={() => handleSelectPlace(seat)}
                                        className={classNames(s.place, {
                                            [s.occupied]: occupiedSeats.some(el => el.row === +row && el.seat === +seat.seat),
                                            [s.selected]: selectedPlaces.some(el => el.row === +row && el.seat === +seat.seat)
                                        })}
                                        style={{gridColumn: seat.gridPosX}}
                                    >
                                        {seat.seat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.placesDescription}>
                <div className={s.freePlace}><span>1</span> Свободное место</div>
                <div className={s.occupiedPlace}><span>1</span> Занятое место</div>
                <div className={s.selectedPlace}><span>1</span> Выбранное место</div>
            </div>
            <div className={s.total}>
                {
                    selectedPlaces.length ? (
                            <div className={s.totalContainer}>
                                {error && <div className={s.totalError}>{error}</div>}
                                <div className={s.totalCount}>{formatPlacesCount(selectedPlaces.length)}</div>
                                <div className={s.totalPrice}>{totalPrice} ₽</div>
                                <Button style={"accent"} className={s.nextButton} onClick={handleBuyTickets}>Далее</Button>
                            </div>
                        ) :
                        <div className={s.totalEmpty}>Корзина пуста</div>
                }
            </div>
        </>
    )
}

interface SecondStepProps {
    orderProcessData: ProcessOrderData
}

const SecondStep = ({orderProcessData}: SecondStepProps) => {
    const {
        occupiedSeats,
        selectedPlaces,
        totalPrice,
        error,
        selectedScreeningInfo
    } = useAppSelector(state => state.reservation)

    const price = Math.round((selectedScreeningInfo?.ticket_price.value || 10000) / 100);

    const date = new Date(selectedScreeningInfo?.start_time.formatted_timestamp || '');
    function formatTime() {
        // const date = new Date(date);
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    function formatDate() {
        // const date = new Date(date);
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`
    }

    const {payment_url} = orderProcessData;
    return <div className={s.payContainer}>
        <div className={s.screeningTime}>
            Показ состоится {formatDate()} в {formatTime()}
        </div>
        <div className={s.orderDescription}>
            <h4 className={s.orderDescriptionTitle}>Состав заказа:</h4>

            <ul className={s.orderDescriptionList}>
                {selectedPlaces.map((place) => (
                    <li className={s.orderDescriptionItem} key={place.seat + place.row}>
                        <div>
                        <FontAwesomeIcon icon={faTicketSimple} />
                            Ряд {place.row} Место {place.seat}
                        </div>
                        <div>
                            Стандартный тариф {price} ₽
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <a href={payment_url} target="_blank" rel="noreferrer">
            <button className={s.payButton}>
                Оплатить {totalPrice} ₽
            </button>
        </a>
        <div className={s.reserveId}></div>
    </div>
}

const PopupBuyTickets = ({className}: PopupBuyTicketsProps) => {
    const {
        selectedScreeningInfo,
        selectedScreening,
        selectedMovie,
        orderProcessData,
    } = useAppSelector(state => state.reservation)
    const {selectedCinema} = useAppSelector(state => state.cinema);

    const dispatch = useAppDispatch();

    if (!selectedScreening || !selectedScreeningInfo || !selectedMovie || !selectedCinema) return null;
    
    function handleOnClose() {
        dispatch(reservationActions.unselectScreening());
    }

    return (<div className={classNames(s.PopupBuyTickets, {}, [className])} onClick={handleOnClose}>
        <div className={s.content} onClick={e => e.stopPropagation()}>
            <div className={s.filmInfo}>
                <img className={s.image} src={selectedMovie.previewPosterUrl} alt="poster"/>
                <div className={s.infoContainer}>
                    <div className={s.infoTop}>
                        <div className={s.screeningType}>
                            {selectedScreeningInfo.screening_type}
                        </div>
                        <div className={s.ageRating}>
                            {selectedMovie.ageRating}
                        </div>
                    </div>
                    <div className={s.infoBottom}>
                        <h2>{selectedMovie.titleRu}</h2>
                        <div className={s.location}>{selectedCinema.name}</div>
                    </div>
                </div>
            </div>

            {!orderProcessData &&<FirstStep hallConfiguration={selectedScreeningInfo.hall_configuration} selectedScreening={selectedScreening} />}

            {orderProcessData && <SecondStep orderProcessData={orderProcessData}/>}

            <button className={s.closeButton}>
                <FontAwesomeIcon icon={faXmark} onClick={handleOnClose}/>
            </button>
        </div>

    </div>);
};

export {PopupBuyTickets};
