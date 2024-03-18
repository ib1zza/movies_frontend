import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {User, OrderInfo, ScreeningInfo} from "@shared/types/types.ts";

interface UserSchema {
    userData: User | null;
    isLoading: boolean;
    error: string;
    sessionId: string;
    machineId: string;
    ordersHistory: OrderInfo[]
}

const initialState: UserSchema = {
    isLoading: false,
    error: '',
    userData: null,
    sessionId: localStorage.getItem("sessionId") || '',
    machineId: localStorage.getItem("machineId") || '',
    ordersHistory: []
};



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setUserData: (state, action: PayloadAction<User | null>) => {
            state.userData = action.payload;
        },
        setSessionId: (state, action: PayloadAction<string>) => {
            state.sessionId = action.payload;
        },
        setMachineId: (state, action: PayloadAction<string>) => {
            state.machineId = action.payload;
        },
        setOrdersHistory: (state, action: PayloadAction<OrderInfo[]>) => {
            state.ordersHistory = action.payload;
        },
        logout: (state) => {
            state.userData = null;
            state.sessionId = '';
            state.machineId = '';
            state.ordersHistory = [];
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
