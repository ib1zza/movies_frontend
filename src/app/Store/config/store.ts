import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {cinemaReducer} from "./slices/cinemaSlice.ts";
import {screeningsReducer} from "@app/Store/config/slices/screeningsSlice.ts";

export const store = configureStore({
    reducer: {
        cinema: cinemaReducer,
        screenings: screeningsReducer
    },
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
