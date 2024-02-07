import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScreeningOverview} from "@shared/types/types.ts";

interface ScreeningsSchema {
    isLoading: boolean;
    error: string;
    allScreenings: ScreeningOverview[];
    // key - cinema_id value - array of screenings
    screeningsByCinema: Record<string, ScreeningOverview[]>;
    selectedCinemaScreenings: ScreeningOverview[];
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
        setScreenings: (state, action: PayloadAction<ScreeningOverview[]>) => {
            state.allScreenings = action.payload;
        },
        setScreeningsByCinema: (state, action: PayloadAction<Record<string, ScreeningOverview[]>>) => {
            state.screeningsByCinema = {...state.screeningsByCinema, ...action.payload};
        },
        setSelectedCinemaScreenings: (state, action: PayloadAction<ScreeningOverview[]>) => {
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
