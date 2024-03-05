import s from "./ScreeningButton.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {Text} from "@shared/ui/Text/Text.tsx";
import {MovieDescriptionShort, Screening} from "@shared/types/types.ts";
import {getInfoAboutScreening} from "@shared/API/CinemaService.ts";
import {getScreeningOccupiedPlaces} from "@shared/API/CinemaOrdersService.ts";
import {useAppDispatch} from "@app/Store/config/store.ts";
import {screeningsActions} from "@app/Store/config/slices/screeningsSlice.ts";
import {reservationActions} from "@app/Store/config/slices/reservationSlice.ts";

interface ScreeningButtonProps {
    className?: string
    screening: Screening;
    movie: MovieDescriptionShort;
}

function formatTime(time: string) {
    const date = new Date(time);
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

function formatPrice(price: number) {
    const rub = price.toString().slice(0, -2);
    return `${rub} ₽`
}

const ScreeningButton = ({className, screening, movie}: ScreeningButtonProps) => {
    const dispatch = useAppDispatch()

    async function onClickScreening() {
        const screeningInfo = await getInfoAboutScreening(screening.screening_id);
        const occupiedPlaces = await getScreeningOccupiedPlaces(screening.screening_id);
        dispatch(reservationActions.setSelectedScreening(screening))
        dispatch(reservationActions.setSelectedScreeningInfo(screeningInfo))
        dispatch(reservationActions.setOccupiedSeats(occupiedPlaces))
        dispatch(reservationActions.setSelectedMovie(movie))
    }

    return (
        <div className={classNames(s.ScreeningButton, {}, [className])} onClick={onClickScreening} key={screening.screening_id}>
                <Text size={"M"} style={"default"}>{formatTime(screening.start_time.formatted_timestamp)}</Text>
                <Text size={"S"} style={"accent"}>{formatPrice(screening.ticket_price.value)}</Text>
        </div>
    );
};

export {ScreeningButton};
