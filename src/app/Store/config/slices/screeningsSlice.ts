import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Screening} from "@shared/types/types.ts";

interface ScreeningsSchema {
    isLoading: boolean;
    error: string;
    allScreenings: Screening[];
    // key - cinema_id value - array of screenings
    screeningsByCinema: Record<string, Screening[]>;
    selectedCinemaScreenings: Screening[];
    selectedCinemaId: number | null;
    // selectedCinemaId: Cinema | null;
}

const initialState: ScreeningsSchema = {
    isLoading: false,
    error: '',
    allScreenings: [],
    screeningsByCinema: {},
    selectedCinemaScreenings: [],
    selectedCinemaId: null
};

export const screeningsSlice = createSlice({
    name: 'screenings',
    initialState,
    reducers: {
        setScreenings: (state, action: PayloadAction<Screening[]>) => {
            state.allScreenings = action.payload;
        },
        setScreeningsByCinema: (state, action: PayloadAction<Record<string, Screening[]>>) => {
            state.screeningsByCinema = {...state.screeningsByCinema, ...action.payload};
        },
        setSelectedCinemaScreenings: (state, action: PayloadAction<Screening[]>) => {
            state.selectedCinemaScreenings = action.payload;
        },
        setSelectedCinemaId: (state, action: PayloadAction<number | null>) => {
            state.selectedCinemaId = action.payload;
            if (!action.payload) {
                state.selectedCinemaScreenings = [];
                return;
            }
            state.selectedCinemaScreenings = state.screeningsByCinema[action.payload] || [];
        },
    }
});

export const { actions: screeningsActions } = screeningsSlice;
export const { reducer: screeningsReducer } = screeningsSlice;
