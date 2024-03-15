import {baseUrl} from "@shared/API/API.ts";
import axios from "axios";
import { User} from "@shared/types/types.ts";


const profilesServiceBaseUrl = baseUrl + "/profiles-service";

const profilesApi = axios.create({
    baseURL: profilesServiceBaseUrl,
})


const getUserInfo = async (sessionId: string, machineId: string ): Promise<User> => {
    const res = await profilesApi.get<User>("/profile",   {
        headers: {
            "X-Session-Id": sessionId,
            "X-Machine-Id": machineId,
        }
    })

    return res.data;
}


export {getUserInfo};
