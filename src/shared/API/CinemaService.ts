import axios from "axios";
import {ScreeningOverview, City, Cinema, Screening, ScreeningInfo} from "@shared/types/types.ts";
import {baseUrl} from "./API.ts";

const cinemaServiceBaseUrl = baseUrl + "/cinema-service";

const cinemaApi = axios.create({
    baseURL: cinemaServiceBaseUrl,
})
interface getAllScreeningsResponse {
    screenings: ScreeningOverview[];
}

const getAllScreenings = async (cinemasIds: number[] = []): Promise<ScreeningOverview[]> => {
    //@ts-ignore
    const params = new URLSearchParams({
        "cities_ids": cinemasIds.join(","),
        "start_period.formatted_timestamp": "2023-01-08T20:30:00Z",
        "end_period.formatted_timestamp": "2025-01-08T20:30:00Z"
    });

    const res = await cinemaApi.get<getAllScreeningsResponse>("/screenings/movies", {
        params: {
            "start_period.formatted_timestamp": "2023-01-08T20:30:00Z",
            "end_period.formatted_timestamp": "2026-01-08T20:30:00Z"
        }
    }).then(response => response.data);

    return res.screenings;
}

interface getAllCitiesResponse {
    cities: City[];
}

const getAllCities = async (): Promise<City[]> => {
    const res = await cinemaApi.get<getAllCitiesResponse>("/cities").then(response => response.data);

    return res.cities;
}

interface getCinemasByCityResponse {
    cinemas: Cinema[];
}


const getCinemasByCity = async (cityId: number | string): Promise<Cinema[]> => {
    const res = await cinemaApi.get<getCinemasByCityResponse>(`/cities/${cityId}/cinemas`).then(response => response.data);

    return res.cinemas;
}

const getCinemaById = async (cinemaId: number | string): Promise<Cinema> => {
    const res = await cinemaApi.get<Cinema>(`/cinema/${cinemaId}`).then(response => response.data);
    return res;
}

interface getScreeningsByCinemaResponse {
    screenings: ScreeningOverview[];
}

const getAviableMoviesByCinema = async (cinemaId: number | string): Promise<ScreeningOverview[]> => {
    const res = await cinemaApi.get<getScreeningsByCinemaResponse>(`/cinema/${cinemaId}/screenings/movies`, {
        params: {
            "start_period.formatted_timestamp": "2023-01-08T20:30:00Z",
            "end_period.formatted_timestamp": "2026-01-08T20:30:00Z"
        }
    }).then(response => response.data);
    return res.screenings;
}

interface getScreeningsByMovieByCinemaResponse {
    screenings: Screening[];
}

const getScreeningsByMovieByCinema = async (cinemaId: number | string, movieId: number | string): Promise<Screening[]> => {
    const res = await cinemaApi.get<getScreeningsByMovieByCinemaResponse>(`/cinema/${cinemaId}/screenings`, {
        params: {
            "movie_id": movieId,
            "start_period.formatted_timestamp": "2023-01-08T20:30:00Z",
            "end_period.formatted_timestamp": "2026-01-08T20:30:00Z"
        }
    }).then(response => response.data);
    return res.screenings;
}

const getInfoAboutScreening = async (screeningId: number | string): Promise<ScreeningInfo> => {
    const res = await cinemaApi.get<ScreeningInfo>(`/screening/${screeningId}`).then(response => response.data);
    return res || {
        "cinema_id": 2,
        "movie_id": 1,
        "screening_type": "3D",
        "start_time": {
            "formatted_timestamp": "2024-02-04T02:00:00Z"
        },
        "hall_id": 2,
        "ticket_price": {
            "value": 10000
        },
        "hall_configuration": {
            "place": [
                {
                    "row": 1,
                    "seat": 1,
                    "gridPosX": 1,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 2,
                    "gridPosX": 2,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 3,
                    "gridPosX": 3,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 4,
                    "gridPosX": 4,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 5,
                    "gridPosX": 5,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 6,
                    "gridPosX": 6,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 7,
                    "gridPosX": 7,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 8,
                    "gridPosX": 8,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 9,
                    "gridPosX": 9,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 10,
                    "gridPosX": 13,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 11,
                    "gridPosX": 14,
                    "gridPosY": 1
                },
                {
                    "row": 1,
                    "seat": 12,
                    "gridPosX": 15,
                    "gridPosY": 1
                },
                {
                    "row": 2,
                    "seat": 1,
                    "gridPosX": 1,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 2,
                    "gridPosX": 2,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 3,
                    "gridPosX": 3,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 4,
                    "gridPosX": 4,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 5,
                    "gridPosX": 5,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 6,
                    "gridPosX": 6,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 7,
                    "gridPosX": 7,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 8,
                    "gridPosX": 8,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 9,
                    "gridPosX": 9,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 10,
                    "gridPosX": 12,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 11,
                    "gridPosX": 13,
                    "gridPosY": 2
                },
                {
                    "row": 2,
                    "seat": 12,
                    "gridPosX": 14,
                    "gridPosY": 2
                },
                {
                    "row": 3,
                    "seat": 1,
                    "gridPosX": 1,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 2,
                    "gridPosX": 2,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 3,
                    "gridPosX": 3,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 4,
                    "gridPosX": 4,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 5,
                    "gridPosX": 5,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 6,
                    "gridPosX": 6,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 7,
                    "gridPosX": 7,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 8,
                    "gridPosX": 8,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 9,
                    "gridPosX": 9,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 10,
                    "gridPosX": 12,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 11,
                    "gridPosX": 13,
                    "gridPosY": 3
                },
                {
                    "row": 3,
                    "seat": 12,
                    "gridPosX": 14,
                    "gridPosY": 3
                },
                {
                    "row": 4,
                    "seat": 1,
                    "gridPosX": 1,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 2,
                    "gridPosX": 2,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 3,
                    "gridPosX": 3,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 4,
                    "gridPosX": 4,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 5,
                    "gridPosX": 5,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 6,
                    "gridPosX": 6,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 7,
                    "gridPosX": 7,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 8,
                    "gridPosX": 8,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 9,
                    "gridPosX": 9,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 10,
                    "gridPosX": 12,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 11,
                    "gridPosX": 13,
                    "gridPosY": 4
                },
                {
                    "row": 4,
                    "seat": 12,
                    "gridPosX": 14,
                    "gridPosY": 4
                },
                {
                    "row": 5,
                    "seat": 1,
                    "gridPosX": 3,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 2,
                    "gridPosX": 4,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 3,
                    "gridPosX": 5,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 4,
                    "gridPosX": 6,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 5,
                    "gridPosX": 7,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 6,
                    "gridPosX": 8,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 7,
                    "gridPosX": 9,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 8,
                    "gridPosX": 10,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 9,
                    "gridPosX": 11,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 10,
                    "gridPosX": 12,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 11,
                    "gridPosX": 13,
                    "gridPosY": 5
                },
                {
                    "row": 5,
                    "seat": 12,
                    "gridPosX": 14,
                    "gridPosY": 5
                },
                {
                    "row": 6,
                    "seat": 1,
                    "gridPosX": 3,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 2,
                    "gridPosX": 4,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 3,
                    "gridPosX": 5,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 4,
                    "gridPosX": 6,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 5,
                    "gridPosX": 7,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 6,
                    "gridPosX": 8,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 7,
                    "gridPosX": 9,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 8,
                    "gridPosX": 10,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 9,
                    "gridPosX": 11,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 10,
                    "gridPosX": 12,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 11,
                    "gridPosX": 13,
                    "gridPosY": 6
                },
                {
                    "row": 6,
                    "seat": 12,
                    "gridPosX": 14,
                    "gridPosY": 6
                },
                {
                    "row": 7,
                    "seat": 1,
                    "gridPosX": 4,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 2,
                    "gridPosX": 5,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 3,
                    "gridPosX": 6,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 4,
                    "gridPosX": 7,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 5,
                    "gridPosX": 8,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 6,
                    "gridPosX": 9,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 7,
                    "gridPosX": 10,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 8,
                    "gridPosX": 11,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 9,
                    "gridPosX": 12,
                    "gridPosY": 7
                },
                {
                    "row": 7,
                    "seat": 10,
                    "gridPosX": 13,
                    "gridPosY": 7
                },
                {
                    "row": 8,
                    "seat": 1,
                    "gridPosX": 4,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 2,
                    "gridPosX": 5,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 3,
                    "gridPosX": 6,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 4,
                    "gridPosX": 7,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 5,
                    "gridPosX": 8,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 6,
                    "gridPosX": 9,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 7,
                    "gridPosX": 10,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 8,
                    "gridPosX": 11,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 9,
                    "gridPosX": 12,
                    "gridPosY": 8
                },
                {
                    "row": 8,
                    "seat": 10,
                    "gridPosX": 13,
                    "gridPosY": 8
                },
                {
                    "row": 9,
                    "seat": 1,
                    "gridPosX": 6,
                    "gridPosY": 9
                },
                {
                    "row": 9,
                    "seat": 2,
                    "gridPosX": 7,
                    "gridPosY": 9
                },
                {
                    "row": 9,
                    "seat": 3,
                    "gridPosX": 8,
                    "gridPosY": 9
                },
                {
                    "row": 9,
                    "seat": 4,
                    "gridPosX": 9,
                    "gridPosY": 9
                },
                {
                    "row": 9,
                    "seat": 5,
                    "gridPosX": 10,
                    "gridPosY": 9
                }
            ]
        }
    };
}


export {getAllScreenings, getAllCities, getCinemaById, getCinemasByCity, getScreeningsByMovieByCinema, getAviableMoviesByCinema, getInfoAboutScreening}
