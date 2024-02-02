import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import s from "./SelectCinema.module.scss"
import {useEffect, useState} from "react";
import {SelectCinemaPopup} from "@/widgets/SelectCinemaPopup/SelectCinemaPopup.tsx";
import {getAllCities, getCinemasByCity} from "@shared/API/CinemaService.ts";
import {useAppDispatch, useAppSelector} from "@app/Store/config/store.ts";
import {cinemaActions} from "@app/Store/config/slices/cinemaSlice.ts";

const SelectCinema = () => {
    const [isOpened, setIsOpened] = useState(false);

    const dispatch = useAppDispatch();
    const {selectedCinema,} = useAppSelector(state => state.cinema);


    useEffect(() => {

        async function getData() {

            const allCities = await getAllCities();
            const selectedCity = allCities[0];
            const cinemasByCity = await getCinemasByCity(selectedCity.city_id);

            return {
                allCities,
                selectedCity,
                cinemasByCity
            }
        }

        getData().then(res => {
            dispatch(cinemaActions.setAllCities(res.allCities))
            dispatch(cinemaActions.setSelectedCity(res.selectedCity));
            dispatch(cinemaActions.setCinemasByCity({[res.selectedCity.city_id]: res.cinemasByCity}));
        })
    }, [])

    return (
        <div className={s.wrapper}>
            <button onClick={() => setIsOpened(!isOpened)} className={s.button}>
                <FontAwesomeIcon icon={faLocationDot}/>
                {selectedCinema?.name || "Выбрать кинотеатр"}
            </button>
            {isOpened && <SelectCinemaPopup onClose={() => setIsOpened(false)}/>}
        </div>
    );
};

export default SelectCinema;
