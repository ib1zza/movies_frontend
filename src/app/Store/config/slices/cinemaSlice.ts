import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {Cinema, City} from "@shared/types/types.ts";

interface CinemaSchema {
    isLoading: boolean;
    error: string;
    allCities: City[];
    selectedCity: City | null;
    // key - city_id value - array of cinemas
    cinemasByCity: Record<string, Cinema[]>;
    selectedCinema: Cinema | null;
}

const initialState: CinemaSchema = {
    isLoading: false,
    error: '',
    allCities: [],
    cinemasByCity: {},
    selectedCity: null,
    selectedCinema: null
};



export const cinemaSlice = createSlice({
    name: 'cinema',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setAllCities: (state, action: PayloadAction<City[]>) => {
            state.allCities = action.payload;
        },
        setSelectedCity: (state, action: PayloadAction<City | null>) => {
            if (state.selectedCity?.city_id === action.payload?.city_id) {
                return;
            }
            state.selectedCity = action.payload;
        },
        setCinemasByCity: (state, action: PayloadAction<Record<string, Cinema[]>>) => {
            state.cinemasByCity = {...state.cinemasByCity, ...action.payload};
        },
        setSelectedCinema: (state, action: PayloadAction<Cinema | null>) => {
            if (state.selectedCinema?.cinema_id === action.payload?.cinema_id) {
                return;
            }
            state.selectedCinema = action.payload;
        },

    },
});

export const { actions: cinemaActions } = cinemaSlice;
export const { reducer: cinemaReducer } = cinemaSlice;
