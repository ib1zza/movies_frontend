import axios from "axios";

const baseUrl = 'http://109.167.154.121/api';

const cinemaBaseUrl = baseUrl + "/cinema-service";

const cinemaApi = axios.create({
    baseURL: cinemaBaseUrl,
})

const getAllScreeneings = async (cinemasIds: number[] = []) => {
    return await cinemaApi.get("/screenings/movies", {
        headers: {
            "Content-Type": "application/json",
            "cities_ids": cinemasIds.join(","),
            "start_period.formatted_timestamp": "2023-01-08T20%3A00%3A00Z",
            "end_period.formatted_timestamp": "2025-01-08T23%3A30%3A00Z"
        }
    }).catch(() => {
        return ({"screenings":[{"movie_id":1,"screenings_types":["3d"],"halls_types":["DASDA"]},{"movie_id":2,"screenings_types":["3d"],"halls_types":["DASDA"]}]})
    })


}

export {getAllScreeneings}
