import s from "./PopupBuyTickets.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import {useAppDispatch, useAppSelector} from "@app/Store/config/store.ts";
import {PlaceWithCoords} from "@shared/types/types.ts";
import {reservationActions} from "@app/Store/config/slices/reservationSlice.ts";
import Button from "@shared/ui/Button/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface PopupBuyTicketsProps {
    className?: string;
}

function formatPlaces(places: PlaceWithCoords[]) {
    const res: Record<string, PlaceWithCoords[]> = {};
    let totalRows = 0;
    let totalColumns = 0;

    places.forEach(el => {
        const row = el.row;
        if (el.gridPosY > totalRows) {
            totalRows = el.gridPosY;
        }
        if (el.gridPosX > totalColumns) {
            totalColumns = el.gridPosX;
        }

        if (row in res) {
            res[row].push(el);
        } else {
            res[row] = [el];
        }
    })
    return {places: res, totalRows, totalColumns};
}

function formatPlacesCount(num: number) {
    switch (num) {
        case 1:
            return "1 место";
        case 2:
            return "2 места";
        case 3:
            return "3 места";
        case 4:
            return "4 места";
        default:
            return `${num} мест`;
    }
}

const PopupBuyTickets = ({className}: PopupBuyTicketsProps) => {
    const {
        selectedScreeningInfo,
        selectedScreening,
        occupiedSeats,
        selectedMovie,
        selectedPlaces,
        totalPrice,
        error
    } = useAppSelector(state => state.reservation)
    const {selectedCinema} = useAppSelector(state => state.cinema);
    const dispatch = useAppDispatch();

    if (!selectedScreening || !selectedScreeningInfo || !selectedMovie || !selectedCinema) return null;

    function handleSelectPlace(place: PlaceWithCoords) {
        dispatch(reservationActions.selectPlace(place));
    }

    function handleOnClose() {
        dispatch(reservationActions.unselectScreening());
    }

    const {places, totalRows, totalColumns} = formatPlaces(selectedScreeningInfo.hall_configuration.place);
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
                                <Button style={"accent"} className={s.nextButton}>Далее</Button>
                            </div>
                        ) :
                        <div className={s.totalEmpty}>Корзина пуста</div>
                }
            </div>

            <button className={s.closeButton}>
                <FontAwesomeIcon icon={faXmark} onClick={handleOnClose}/>
            </button>
        </div>

    </div>);
};

export {PopupBuyTickets};
