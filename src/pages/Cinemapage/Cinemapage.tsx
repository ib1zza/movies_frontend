import s from "./Cinemapage.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {cinemaActions} from "@app/Store/config/slices/cinemaSlice.ts";
import {useAppSelector} from "@app/Store/config/store.ts";
import {Text} from "@shared/ui/Text/Text.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {CarouselWithFilms} from "@/widgets/CarouselWithFilms/CarouselWithFilms.tsx";
import {screeningsActions} from "@app/Store/config/slices/screeningsSlice.ts";
import {
    getAviableMoviesByCinema,
    getScreeningsByCinema,
    getScreeningsByMovieByCinema
} from "@shared/API/CinemaService.ts";
import {MovieCoverSmall} from "@components/MovieCoverSmall/MovieCoverSmall.tsx";
import {MovieDescriptionShort} from "@shared/types/types.ts";
import {getMoviesInfoShort} from "@shared/API/MoviesService.ts";
import {MovieWithScreenings} from "@/widgets/MovieWithScreenings/MovieWithScreenings.tsx";

interface CinemapageProps {
    className?: string
}
const Cinemapage = ({className} : CinemapageProps) => {
    // const {cinemaId} = useParams();
    const {selectedCinema} = useAppSelector(state => state.cinema);
    const {selectedCinemaScreenings, selectedCinemaId} = useAppSelector(state => state.screenings)
    const dispatch = useDispatch();
    const [movies, setMovies] = useState<MovieDescriptionShort[]>([]);

    useEffect(() => {
        if(!selectedCinema) return;
        // if (selectedCinemaId === selectedCinema.cinema_id) return;

        getAviableMoviesByCinema(selectedCinema.cinema_id).then(res => {
            getMoviesInfoShort(res.map(s => String(s.movie_id))).then(setMovies);
            getScreeningsByMovieByCinema(selectedCinemaId || 0, res[0].movie_id).then(res => {
console.log(res)
            })
            dispatch(screeningsActions.setScreeningsByCinema({[selectedCinema.cinema_id]: res}));
            dispatch(screeningsActions.setSelectedCinemaId(selectedCinema.cinema_id));
        })

        // if (!cinemaId) return;
        // TODO: query for cinema/:cinemaId to prevent losing data after page refresh
        // dispatch(cinemaActions.setSelectedCinema())
    }, [selectedCinema?.cinema_id])

    if (!selectedCinema || !selectedCinemaId) return null;

    console.log(selectedCinemaScreenings)
    return (
        <div className={classNames(s.Cinemapage, {}, [className])}>
            <div className={s.cinemaInfo}>
                <Text size={"L"} style={"default"} underline bold>{selectedCinema.name}</Text>
                <Text className={s.address} size={"M"} style={"default"}>
                    <FontAwesomeIcon icon={faLocationDot}/>

                    Адрес: {selectedCinema.address}</Text>
            </div>

            <div className={s.carousel}>
                {movies.map(movie => (
                    <div className={s.movieWithScreenings}>
                        <MovieWithScreenings key={movie.id} movie={movie} cinemaId={selectedCinemaId}/>
                        {/*<MovieCoverSmall movie={movie} key={movie.id} />*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export {Cinemapage};
