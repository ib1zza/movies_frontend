import axios from "axios";
import { Screening, MovieDescriptionShort } from "../types/types";

const baseUrl = 'http://109.167.154.121/api';

const cinemaServiceBaseUrl = baseUrl + "/cinema-service";

const cinemaApi = axios.create({
    baseURL: cinemaServiceBaseUrl,
})
interface getAllScreeneingsResponse {
    screenings: Screening[];
}

const getAllScreeneings = async (cinemasIds: number[] = []): Promise<Screening[]> => {
    const params = new URLSearchParams({
        // "cities_ids": cinemasIds.join(","),
        "start_period.formatted_timestamp": "2023-01-08T20:30:00Z",
        "end_period.formatted_timestamp": "2025-01-08T20:30:00Z"
    });
    const res1 =  await fetch(cinemaServiceBaseUrl + "/screenings/movies" + "?" + params).then(response => response.json()).catch(() => {
        return ({"screenings":[{"movie_id":1,"screenings_types":["3d"],"halls_types":["DASDA"]},{"movie_id":2,"screenings_types":["3d"],"halls_types":["DASDA"]}]})
    })

    const res = await cinemaApi.get<getAllScreeneingsResponse>("/screenings/movies", {
        params: {
            "start_period.formatted_timestamp": "2023-01-08T20:30:00Z",
            "end_period.formatted_timestamp": "2025-01-08T20:30:00Z"
        }
    }).then(response => response.data);

    return res.screenings;
}

const moviesServiceBaseUrl = baseUrl + "/movies-service";

const moviesApi = axios.create({
    baseURL: moviesServiceBaseUrl,
})

type MovieDescriptionShortFromServer = Omit<MovieDescriptionShort,"id">

interface getMoviesInfoResponse {
    movies: Record<string, MovieDescriptionShortFromServer>;
}

const getMoviesInfoShort = async (ids: string[] = []): Promise<MovieDescriptionShort[]> => {

    function transformResponce(res: getMoviesInfoResponse) {
        return Object.entries(res.movies).map(([key, value]) => ({...value, id: key}));
    }

    const res =  await moviesApi.get<getMoviesInfoResponse>("/movies/preview", {
        headers: {
            "Content-Type": "application/json",
            // "movies_ids": ids.join(",")
        },
        params: {
            "movies_ids": ids.join(",")
        }
    }).then(response => response.data).then(() => {
        console.log("res");
        return ({
            "movies": {
                "1": {
                    "short_description": "Аристократ на коляске нанимает в сиделки бывшего заключенного. Искрометная французская комедия с Омаром Си",
                    "title_ru": "1+1",
                    "title_en": "",
                    "duration": 112,
                    "preview_poster_url": "http://109.167.154.121/image/previewposters/708c4d46-7642-42ec-a33c-699686885b24",
                    "countries": [
                        "Франция"
                    ],
                    "genres": [
                        "комедия",
                        "драма",
                        "биография"
                    ],
                    "release_year": 2011,
                    "age_rating": "18+"
                },
                "2": {
                    "short_description": "Наркобарон хочет уйти на покой, но криминальный мир не отпускает. Успешное возвращение Гая Ричи к корням",
                    "title_ru": "Джентльмены",
                    "title_en": "",
                    "duration": 113,
                    "preview_poster_url": "http://109.167.154.121/image/previewposters/fecaf4d1-a3d9-4c8b-8355-e515c871ccf2",
                    "countries": [
                        "США",
                        "Великобритания"
                    ],
                    "genres": [
                        "криминал",
                        "комедия",
                        "боевик"
                    ],
                    "release_year": 2019,
                    "age_rating": "18+"
                },
                "3": {
                    "short_description": "Восхождение циника-гедониста на бизнес-олимп 1980-х. Блистательный тандем Леонардо ДиКаприо и Мартина Скорсезе",
                    "title_ru": "Волк с Уолл-стрит",
                    "title_en": "",
                    "duration": 180,
                    "preview_poster_url": "http://109.167.154.121/image/previewposters/4d9a7184-6dcc-4ced-81f8-358c31d3858d",
                    "countries": [
                        "США"
                    ],
                    "genres": [
                        "драма",
                        "криминал",
                        "биография",
                        "комедия"
                    ],
                    "release_year": 2013,
                    "age_rating": "18+"
                }
            }
        })
    })

    return transformResponce(res)
}

export {getAllScreeneings, getMoviesInfoShort}
