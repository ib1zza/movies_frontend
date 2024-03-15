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

interface reservePlaceResponse {
    reserve_id: string,
    time_to_pay: number
}

interface processReservationResponse {
    payment_url: string
}

const reservePlaces = async (screeningId: number | string, places: Place[], email: string, sessionId: string, machineId: string): Promise<processReservationResponse> => {
    const res1 = await cinemaOrdersApi.post<reservePlaceResponse>(`screening/${screeningId}/reserve`, {
        places,
    });

    const {reserve_id} = res1.data;

    const res2 = await cinemaOrdersApi.post<processReservationResponse>(`/reservation/${reserve_id}/process`, {
        email,
    }, {
        params: {
            "X-Session-Id": sessionId,
            "X-Machine-Id": machineId,
        }
    });

    return res2.data;
}

export {getScreeningOccupiedPlaces, reservePlaces}
