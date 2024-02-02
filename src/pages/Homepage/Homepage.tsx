import {Text} from "@shared/ui/Text/Text.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import s from "./Homepage.module.scss";
import {useEffect, useState} from "react";
import {getMoviesInfoShort} from "@shared/API/API.ts";
import { MovieDescriptionShort } from "@/shared/types/types";
import {CarouselWithFilms} from "@/widgets/CarouselWithFilms/CarouselWithFilms.tsx";
import {MovieCoverSmall} from "@components/MovieCoverSmall/MovieCoverSmall.tsx";
import {getAllCities, getAllScreenings, getCinemasByCity} from "@shared/API/CinemaService.ts";




const Homepage = () => {
    const [data, setData] = useState<MovieDescriptionShort[]>([]);

    useEffect(() => {
        getCinemasByCity(1).then(res => console.log(res));
        getAllScreenings()
            .then(data => {
                console.log(data)
                return data;
            })
            .then(data => getMoviesInfoShort([...new Set(data.map(s => s.movie_id + ""))]))
            .then((res) => setData(res))
    }, []);

    console.log("movies", data);

    return (
        <div>
            <div className={s.nowInCinemas}>
                <div className={s.heading}>
            <Text size={"L"} underline bold style={"default"}>Сейчас в кино</Text>
            <Text size={"L"}  style={"accent"}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Text>
                </div>

            <CarouselWithFilms className={s.carouselMain}>
                {data.map(el => <MovieCoverSmall movie={el} key={el.id} />)}
            </CarouselWithFilms>
            </div>
        </div>
    );
};

export default Homepage;
