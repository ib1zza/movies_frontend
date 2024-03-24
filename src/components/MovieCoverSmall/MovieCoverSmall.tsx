import {classNames} from "@shared/lib/classNames";
import s from "./MovieCoverSmall.module.scss"   ;
import {MovieDescriptionShort} from "@shared/types/types.ts";
import {Text} from "@shared/ui/Text/Text.tsx";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "@app/AppRouter/AppRoutes.ts";

interface MovieCoverSmallProps {
    className?: string,
    movie: MovieDescriptionShort;
}

const MovieCoverSmall = ({className, movie}: MovieCoverSmallProps) => {
    const {
        id,
        genres,
        previewPosterUrl,
        titleRu,
        ageRating,
    } = movie;

    const navigate = useNavigate();

    const handleClickPoster = () => {
        navigate(AppRoutes.MOVIE + "/" + id);
    }
    return (
        <div className={classNames(s.MovieCoverSmall, {}, [className])}>
            <div className={s.image}>
                <img src={previewPosterUrl} alt="poster" onClick={handleClickPoster}/>
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
