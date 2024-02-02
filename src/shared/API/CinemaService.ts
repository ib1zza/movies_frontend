import axios from "axios";
import {Screening, City, Cinema} from "@shared/types/types.ts";
import {baseUrl} from "./API.ts";

const cinemaServiceBaseUrl = baseUrl + "/cinema-service";

const cinemaApi = axios.create({
    baseURL: cinemaServiceBaseUrl,
})
interface getAllScreeningsResponse {
    screenings: Screening[];
}

const getAllScreenings = async (cinemasIds: number[] = []): Promise<Screening[]> => {
    const params = new URLSearchParams({
        // "cities_ids": cinemasIds.join(","),
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

interface getScreeningsByCinemaResponse {
    screenings: Screening[];
}

const getScreeningsByCinema = async (cinemaId: number | string): Promise<Screening[]> => {
    const res = await cinemaApi.get<getScreeningsByCinemaResponse>(`/cinema/${cinemaId}/screenings/movies`, {
        params: {
            "start_period.formatted_timestamp": "2023-01-08T20:30:00Z",
            "end_period.formatted_timestamp": "2026-01-08T20:30:00Z"
        }
    }).then(response => response.data);
    return res.screenings;
}

export {getAllScreenings, getAllCities, getCinemasByCity, getScreeningsByCinema}
