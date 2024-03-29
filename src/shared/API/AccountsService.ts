import {baseUrl} from "@shared/API/API.ts";
import axios from "axios";
import {ScreeningOverview} from "@shared/types/types.ts";
import {RegisterData} from "@pages/Auth/Register/Register.tsx";
import {v4 as uuid} from "uuid";


const accountsServiceBaseUrl = baseUrl + "/accounts-service";

const accountsApi = axios.create({
    baseURL: accountsServiceBaseUrl,
})


const signUp = async (data: RegisterData): Promise<ScreeningOverview[]> => {
    const res = await accountsApi.post<any>("/sign-up", data).then(response => response.data);

    return res;
}

const urlAfterVerify = "http://falokut.ru/api/accounts-service/verify";

// https://falokut.ru/api/accounts-service/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTAzMjI2MDMsImlhdCI6MTcxMDMxMTgwMywidmFsdWUiOiJkcmVtYXN0MTMzN0BnbWFpbC5jb20ifQ.A2V5FjH6i6yM0SvhR-62hXm6Qe68QSBevD60l_T4Xvk

const verifyEmail = async (email: string): Promise<boolean> => {
    const res = await accountsApi.get<any>("/verification", {
        params: {
            email, url: urlAfterVerify
        }
       }).then(response => response.data);

    return res;
}

interface signInResponse {
    session_id: string
}

const signIn = async (email: string, password: string, ip: string): Promise<signInResponse> => {
    if (!localStorage.getItem("machineId")) {
        localStorage.setItem("machineId", uuid());
    }

    const res = await accountsApi.post<signInResponse>("/sign-in", {
        email,
        password,
        client_ip: ip

    }, {
        headers: {
            "X-Machine-Id": localStorage.getItem("machineId"),
        }
    })

    return res.data;
}

const signOut = async (sessionId: string, machineId: string) => {
    const res = await accountsApi.post<any>("/logout", {}, {
        headers: {
            "X-Session-Id": sessionId,
            "X-Machine-Id": machineId
        }
    });

    return res.data;
}

export {signUp, verifyEmail, signIn, signOut};
