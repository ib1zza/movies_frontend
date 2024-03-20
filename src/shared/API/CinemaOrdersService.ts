import axios from "axios";
import {baseUrl} from "./API.ts";
import {OrderInfo, Place} from "@shared/types/types.ts";
import { ProcessOrderData } from "@shared/types/types.ts";

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

type processReservationResponse = ProcessOrderData;

const reservePlaces = async (screeningId: number | string, places: Place[], email: string, sessionId: string, machineId: string): Promise<processReservationResponse | null> => {
    const res1 = await cinemaOrdersApi.post<reservePlaceResponse>(`screening/${screeningId}/reserve`, {
        places,
    });

    const {reserve_id} = res1.data;

    let counter = 0;

    while (counter < 5) {
        try {
            const res2 = await cinemaOrdersApi.post<processReservationResponse>(`/reservation/${reserve_id}/process`, {
                email,
            },
                {
                    headers: {
                        "X-Session-Id": sessionId,
                        "X-Machine-Id": machineId,
                    }
                });
            return res2.data;
        } catch (e) {
            counter++;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    return null;
}

interface getOrdersResponse {
    orders: OrderInfo[];
}

const getOrders = async ( sessionId: string, machineId: string, page: number = 1, limit: number = 10) =>  {
    const res = await cinemaOrdersApi.get<getOrdersResponse>("/orders", {
        headers: {
            "X-Session-Id": sessionId,
            "X-Machine-Id": machineId,
        },
        params: {
            page,
            limit,
        }
    })

    return res.data.orders;
}

export {getScreeningOccupiedPlaces, reservePlaces, getOrders}
