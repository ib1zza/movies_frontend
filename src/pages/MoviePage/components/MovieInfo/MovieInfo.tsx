import s from "./MovieInfo.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {MovieDescription} from "@shared/types/types.ts";
import {Text} from "@shared/ui/Text/Text.tsx";
import Button from "@shared/ui/Button/Button.tsx";

interface MovieInfoProps {
    className?: string;
    movieInfo: MovieDescription
}

const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`
}
const MovieInfo = ({className, movieInfo} : MovieInfoProps) => {
    return (
        <div className={classNames(s.MovieInfo, {}, [className])}>
            <img src={movieInfo.posterUrl} alt=""/>

            <div className={s.info}>

                <div className={s.top}>
                    <h1 className={s.title}>{movieInfo.titleRu} </h1>
                    <div className={s.ageRating}>{movieInfo.ageRating}</div>
                </div>
                <div className={s.bottom}>
                    <div><Text size={"M"} bold>Жанр:</Text> {movieInfo.genres.join(", ")}</div>
                    <div><Text size={"M"} bold>Длительность:</Text> {formatDuration(movieInfo.duration)}</div>
                    <div><Text size={"M"} bold>Страна:</Text> {movieInfo.countries.join(", ")}</div>
                </div>
                <div className={s.description}><Text size={"M"} bold>Описание:</Text> {movieInfo.description}</div>

                <Button className={s.buy} >
                    <Text size={"M"} bold>Купить билет</Text>
                 </Button>
            </div>

        </div>
    );
};

export {MovieInfo};
