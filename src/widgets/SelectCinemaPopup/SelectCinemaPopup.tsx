import s from "./SelectCinemaPopup.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {useAppDispatch, useAppSelector} from "@app/Store/config/store.ts";
import {Text} from "@shared/ui/Text/Text.tsx";
import {cinemaActions} from "@app/Store/config/slices/cinemaSlice.ts";
import {Cinema, City} from "@shared/types/types.ts";
import {getCinemasByCity} from "@shared/API/CinemaService.ts";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";

interface SelectCinemaPopupProps {
    className?: string;
    onClose: () => void
}
const SelectCinemaPopup = ({className, onClose} : SelectCinemaPopupProps) => {

    const dispatch = useAppDispatch();
    const { allCities, cinemasByCity, selectedCinema, selectedCity } = useAppSelector(state => state.cinema);



    function onSelectCity(city: City) {
        if (Object.keys(cinemasByCity).includes(String(city.city_id))) {
            dispatch(cinemaActions.setSelectedCity(city));
        } else {
            getCinemasByCity(city.city_id).then(res => {
                dispatch(cinemaActions.setCinemasByCity({[city.city_id]: res}));
                dispatch(cinemaActions.setSelectedCity(city));
            })
        }
    }

    const navigate = useNavigate();

    function onSelectCinema(cinema: Cinema) {
        dispatch(cinemaActions.setSelectedCinema(cinema));
        navigate(AppRoutes.CINEMA + `/${cinema.cinema_id}`);
        onClose();
    }

    const cinemas = cinemasByCity[selectedCity?.city_id || 0];

    return (
        <div className={classNames(s.SelectCinemaPopup, {}, [className])}>
            <div className={s.wrapper}>
                <div className={s.citiesSelector}>
                    {allCities.map(city => (
                        <Text bold={selectedCity?.city_id === city.city_id} size={"M"} style={"accent"} onClick={() => onSelectCity(city)} key={city.city_id}>{city.name}</Text>
                    ))}
                </div>
                <div className={s.cinemasSelector}>
                    {cinemas.map(cinema => (
                        <div className={s.singleCinema}  key={cinema.cinema_id}>
                        <Text size={"S"} style={"white"} onClick={() => onSelectCinema(cinema)}>{cinema.name}</Text>
                            <Text className={s.address} size={"XS"} style={"white"}>Адрес: {cinema.address}</Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export {SelectCinemaPopup};
