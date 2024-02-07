import s from "./MoviepageByCinema.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {useParams} from "react-router-dom";

interface MoviepageByCinemaProps {
    className?: string
}
const MoviepageByCinema = ({className} : MoviepageByCinemaProps) => {
    const {cinemaId, movieId} = useParams();



    return (
        <div className={classNames(s.MoviepageByCinema, {}, [className])}>

        </div>
    );
};

export {MoviepageByCinema};
