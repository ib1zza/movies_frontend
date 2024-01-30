import {classNames} from "@shared/lib/classNames";
import s from "./MovieCoverSmall.module.scss"   ;
import {MovieDescriptionShort} from "@shared/types/types.ts";
import {Text} from "@shared/ui/Text/Text.tsx";

interface MovieCoverSmallProps {
    className?: string,
    movie: MovieDescriptionShort;
}

const MovieCoverSmall = ({className, movie}: MovieCoverSmallProps) => {
    const {
        id,
        countries,
        genres,
        preview_poster_url,
        duration,
        short_description,
        age_rating,
        title_en,
        title_ru,
        release_year,
    } = movie;
    return (
        <div className={classNames(s.MovieCoverSmall, {}, [className])}>
            <div className={s.image}>
                <img src={preview_poster_url} alt="poster"/>
                <div className={s.rating}>{age_rating}</div>
            </div>
            <div className={s.info}>
                <Text size={"S"} bold style={"default"}>{title_ru}</Text>
                <Text size={"XS"} style={"accent"}>{genres[0]}</Text>
            </div>
        </div>
    );
};

export {MovieCoverSmall};
