import s from "./MoviePage.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {useEffect, useState} from "react";
import {getScreeningsByMovieByCity} from "@shared/API/CinemaService.ts";
import {getMovieInfo, getMoviesInfoShort} from "@shared/API/MoviesService.ts";
import {useNavigate, useParams} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";
import {useAppSelector} from "@app/Store/config/store.ts";
import {MovieDescription, Screening} from "@shared/types/types.ts";
import {MovieInfo} from "@pages/MoviePage/components/MovieInfo/MovieInfo.tsx";
import {MovieScreenings} from "@pages/MoviePage/components/MovieScreenings/MovieScreenings.tsx";

interface MoviePageProps {
    className?: string
}

const MoviePage = ({className} : MoviePageProps) => {
    const {movieId} = useParams();
    const navigate = useNavigate();
    const {selectedCity} = useAppSelector(state => state.cinema)
    const [movieInfo, setMovieInfo] = useState<MovieDescription | null>(null)
    const [screenings, setScreenings] = useState<Screening[]>([])

    useEffect(() => {

        if (!movieId) {
            navigate(AppRoutes.HOMEPAGE, {replace: true});
            return;
        }

        if (!selectedCity) {
            return;
        }
        getMovieInfo(movieId).then((res) => {
            console.log(res)
            setMovieInfo(res)
        })
        getScreeningsByMovieByCity(selectedCity.city_id,movieId).then((res) => {
            console.log(res)
            setScreenings(res)
        })
    }, [selectedCity, movieId])



    return (
        <div className={classNames(s.MoviePage, {}, [className])}>
            {movieInfo &&
                <MovieInfo movieInfo={movieInfo}/>}
            {movieInfo && screenings.length > 0 && <MovieScreenings screenings={screenings} movie={movieInfo}/>}

        </div>
    );
};

export {MoviePage};
