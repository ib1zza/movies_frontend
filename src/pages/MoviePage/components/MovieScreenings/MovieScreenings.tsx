import s from "./MovieScreenings.module.scss"   ;
import {classNames} from "@shared/lib/classNames.ts";
import {Cinema, MovieDescription, MovieDescriptionShort, Screening} from "@shared/types/types.ts";
import {Text} from "@shared/ui/Text/Text.tsx";
import {useAppSelector} from "@app/Store/config/store.ts";
import {ScreeningButton} from "@components/ScreeningButton/ScreeningButton.tsx";

interface MovieScreeningsProps {
    className?: string;
    screenings: Screening[]
    movie: MovieDescription
}
const MovieScreenings = ({className, screenings, movie} : MovieScreeningsProps) => {
    const {selectedCity: currentCity, cinemasByCity} = useAppSelector(state => state.cinema);

    if (!currentCity || !cinemasByCity[currentCity.city_id]) {
        return null
    }

    const allCinemasByCity = cinemasByCity[currentCity.city_id]
    const modScreenings = screenings.map(screening => ({
        // @ts-ignore
        ...screening, cinema: allCinemasByCity.find(cinema => cinema.cinema_id === screening.cinema_id) as Cinema
    })).reduce((acc, el) => {
        if (acc[el.cinema.name]) {
            acc[el.cinema.name].push(el)
        } else {
            acc[el.cinema.name] = [el]
        }
        return acc
    }, {} as {[key: string]: Screening[]});


    console.log(modScreenings)
    return (
        <div className={classNames(s.MovieScreenings, {}, [className])}>
            <Text size={"L"} bold>Сеансы на сегодня в городе {currentCity?.name}:</Text>
            {
                Object.keys(modScreenings).map((key) => {
                    return (
                        <div key={key} className={s.screenings}>
                            <Text size={"M"} bold className={s.cinemaName}>{key}</Text>
                            <div className={s.screeningsList}>
                                {
                                    modScreenings[key].map((screening) => {
                                        const newMovie = Object.assign(movie, {previewPosterUrl: movie.posterUrl, shortDescription: movie.description})
                                        return (
                                            <div key={screening.screening_id} className={s.screening}>
                                                <ScreeningButton screening={screening} movie={newMovie}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export {MovieScreenings};
