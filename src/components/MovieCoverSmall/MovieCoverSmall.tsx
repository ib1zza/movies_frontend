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
        previewPosterUrl,
        releaseYear,
        titleEn,
        titleRu,
        shortDescription,
        ageRating,
        duration,
    } = movie;
    return (
        <div className={classNames(s.MovieCoverSmall, {}, [className])}>
            <div className={s.image}>
                <img src={previewPosterUrl} alt="poster"/>
                <div className={s.rating}>{ageRating}</div>
            </div>
            <div className={s.info}>
                <Text size={"S"} bold style={"default"}>{titleRu}</Text>
                <Text size={"XS"} style={"accent"}>{genres[0]}</Text>
            </div>
        </div>
    );
};

export {MovieCoverSmall};
