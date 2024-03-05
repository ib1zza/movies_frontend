import s from "./PopupBuyTickets.module.scss";
import {classNames} from "@shared/lib/classNames.ts";
import {useAppDispatch, useAppSelector} from "@app/Store/config/store.ts";
import {PlaceWithCoords} from "@shared/types/types.ts";
import {reservationActions} from "@app/Store/config/slices/reservationSlice.ts";

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

const PopupBuyTickets = ({className}: PopupBuyTicketsProps) => {
    const {selectedScreeningInfo, selectedScreening, occupiedSeats, selectedMovie, selectedPlaces} = useAppSelector(state => state.reservation)
    const {selectedCinema} = useAppSelector(state => state.cinema);

    const dispatch = useAppDispatch();

    if (!selectedScreening || !selectedScreeningInfo || !selectedMovie || !selectedCinema ) return null;

    function handleSelectPlace(place: PlaceWithCoords) {
        dispatch(reservationActions.selectPlace(place));
    }

    const {places, totalRows, totalColumns} = formatPlaces(selectedScreeningInfo.hall_configuration.place);
    return (<div className={classNames(s.PopupBuyTickets, {}, [className])}>
        <div className={s.content}>
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
                                        className={classNames(s.place, {[s.occupied]: occupiedSeats.some(el => el.row === +row && el.seat === +seat.seat), [s.selected]:  selectedPlaces.some(el => el.row === +row && el.seat === +seat.seat)})}
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
        </div>
    </div>);
};

export {PopupBuyTickets};
