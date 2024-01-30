import {Text} from "@shared/ui/Text/Text.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import s from "./Homepage.module.scss";
import {useEffect, useState} from "react";
import {getAllScreeneings, getMoviesInfoShort} from "@shared/API/API.ts";
import { MovieDescriptionShort } from "@/shared/types/types";
import {CarouselWithFilms} from "@/widgets/CarouselWithFilms/CarouselWithFilms.tsx";
import {MovieCoverSmall} from "@components/MovieCoverSmall/MovieCoverSmall.tsx";




const Homepage = () => {
    const [data, setData] = useState<MovieDescriptionShort[]>([]);

    useEffect(() => {
        getAllScreeneings().then(data => getMoviesInfoShort(data.map(s => s.movie_id + ""))).then((res) => setData(res))
    }, [])

    console.log(data);

    return (
        <div>
            <div className={s.nowInCinemas}>
                <div className={s.heading}>
            <Text size={"L"} underline bold style={"default"}>Сейчас в кино</Text>
            <Text size={"L"}  style={"accent"}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Text>
                </div>

            <CarouselWithFilms>

                {data.map(el => <MovieCoverSmall movie={el} key={el.id} />)}
            </CarouselWithFilms>
            </div>
        </div>
    );
};

export default Homepage;
