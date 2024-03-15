import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {User} from "@shared/types/types.ts";

interface UserSchema {
    userData: User | null;
    isLoading: boolean;
    error: string;
    sessionId: string;
    machineId: string;
}

const initialState: UserSchema = {
    isLoading: false,
    error: '',
    userData: null,
    sessionId: localStorage.getItem("sessionId") || '',
    machineId: localStorage.getItem("machineId") || '',
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

    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
