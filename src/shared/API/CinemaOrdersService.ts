import axios from "axios";
import {baseUrl} from "./API.ts";
import {Place} from "@shared/types/types.ts";

const cinemaOrdersServiceBaseUrl = baseUrl + "/orders-service";

const cinemaOrdersApi = axios.create({
    baseURL: cinemaOrdersServiceBaseUrl,
})

interface getScreeningOccupiedPlacesResponse {
    places: Place[];
}

const getScreeningOccupiedPlaces = async (screeningId: number | string): Promise<Place[]> => {
    const res = await cinemaOrdersApi.get<getScreeningOccupiedPlacesResponse>(`/screening/${screeningId}/occupied-places`).then(response => response.data);
    return res.places;
}

export {getScreeningOccupiedPlaces}
