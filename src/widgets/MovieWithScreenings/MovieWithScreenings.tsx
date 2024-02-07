import s from "./MovieWithScreenings.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {MovieDescriptionShort, Screening} from "@shared/types/types.ts";
import {useEffect, useState} from "react";
import {getScreeningsByMovieByCinema} from "@shared/API/CinemaService.ts";
import {MovieCoverSmall} from "@components/MovieCoverSmall/MovieCoverSmall.tsx";
import {Text} from "@shared/ui/Text/Text.tsx";

interface MovieWithScreeningsProps {
    className?: string;
    movie: MovieDescriptionShort;
    cinemaId: number | string;
}

function formatTime(time: string) {
    const date = new Date(time);
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

function formatPrice(price: number) {
    const rub = price.toString().slice(0, -2);
    return `${rub} ₽`
}

const MovieWithScreenings = ({className, movie, cinemaId} : MovieWithScreeningsProps) => {
    const [screenings, setScreenings] = useState<Screening[]>([]);

    useEffect(() => {
        getScreeningsByMovieByCinema(cinemaId, movie.id).then(setScreenings);
    }, []);

    console.log(screenings)
    return (
        <div className={classNames(s.MovieWithScreenings, {}, [className])}>
            <MovieCoverSmall movie={movie}/>
            <div className={s.screenings}>
                {screenings.map(screening => (
                    <div className={s.screening} key={screening.screening_id}>
                        <Text size={"M"} style={"default"}>{formatTime(screening.start_time.formatted_timestamp)}</Text>
                        <Text size={"S"} style={"accent"}>от {formatPrice(screening.ticket_price.value)}</Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

export {MovieWithScreenings};
