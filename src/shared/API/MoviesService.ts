import axios from "axios";
import {MovieDescriptionShort} from "@shared/types/types.ts";
import {baseUrl} from "@shared/API/API.ts";


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
        },
        params: {
            "movies_ids": ids.join(",")
        }
    }).then(response => response.data)


    return transformResponce(res)
}

export {getMoviesInfoShort}
