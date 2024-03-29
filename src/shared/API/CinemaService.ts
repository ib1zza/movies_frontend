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

const getScreeningsByMovieByCity = async (cityId: number | string, movieId: number | string): Promise<Screening[]> => {
    const res = await cinemaApi.get<getScreeningsByMovieByCinemaResponse>(`/city/${cityId}/screenings`, {
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
    return res;
}


export {getAllScreenings, getAllCities, getCinemaById, getCinemasByCity, getScreeningsByMovieByCinema, getAviableMoviesByCinema, getInfoAboutScreening, getScreeningsByMovieByCity}
