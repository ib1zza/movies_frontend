import s from "./MovieWithScreenings.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {MovieDescriptionShort, Screening} from "@shared/types/types.ts";
import {useEffect, useState} from "react";
import { getScreeningsByMovieByCinema} from "@shared/API/CinemaService.ts";
import {MovieCoverSmall} from "@components/MovieCoverSmall/MovieCoverSmall.tsx";
import {ScreeningButton} from "@components/ScreeningButton/ScreeningButton.tsx";

interface MovieWithScreeningsProps {
    className?: string;
    movie: MovieDescriptionShort;
    cinemaId: number | string;
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
                    <ScreeningButton screening={screening} key={screening.screening_id} movie={movie}/>
                ))}
            </div>
        </div>
    );
};

export {MovieWithScreenings};
