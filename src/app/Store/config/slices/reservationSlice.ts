import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {HallConfiguration, MovieDescriptionShort, Place, Screening, ScreeningInfo} from "@shared/types/types.ts";

interface ReservationSchema {
    isLoading: boolean;
    error: string;
    selectedScreening: Screening | null;
    selectedScreeningInfo: ScreeningInfo | null;
    hallConfiguration: HallConfiguration | null;
    occupiedSeats: Place[];
    selectedMovie: MovieDescriptionShort | null;
    selectedPlaces: Place[];
}

const initialState: ReservationSchema = {
    isLoading: false,
    error: '',
    selectedScreening: null,
    selectedScreeningInfo: null,
    hallConfiguration: null,
    occupiedSeats: [],
    selectedPlaces: [],
    selectedMovie: null,
};



export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setSelectedScreening: (state, action: PayloadAction<Screening>) => {
            state.selectedScreening = action.payload;
        },
        setSelectedScreeningInfo: (state, action: PayloadAction<ScreeningInfo>) => {
            state.selectedScreeningInfo = action.payload;
            state.hallConfiguration = action.payload.hall_configuration
        },
        setSelectedMovie: (state, action: PayloadAction<MovieDescriptionShort>) => {
            state.selectedMovie = action.payload;
        },
        setHallConfiguration: (state, action: PayloadAction<HallConfiguration>) => {
            state.hallConfiguration = action.payload;
        },
        selectPlace: (state, action: PayloadAction<Place>) => {
            const selectedPlace = action.payload;
            if(state.selectedPlaces.find(el => selectedPlace.seat === el.seat && selectedPlace.row === el.row) || state.occupiedSeats.find(el => selectedPlace.seat === el.seat && selectedPlace.row === el.row)) {
                state.selectedPlaces = state.selectedPlaces.filter(place => place.seat !== selectedPlace.seat || place.row !== selectedPlace.row);
            } else {
                state.selectedPlaces.push(action.payload);
            }
        },
        setOccupiedSeats: (state, action: PayloadAction<Place[]>) => {
            state.occupiedSeats = action.payload;
        },
        unselectScreening: (state) => {
            state.selectedScreening = null;
            state.selectedScreeningInfo = null;
            state.hallConfiguration = null;
            state.occupiedSeats = [];
        }
    },
});

export const { actions: reservationActions } = reservationSlice;
export const { reducer: reservationReducer } = reservationSlice;
