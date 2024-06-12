import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    });

    export type RootState = ReturnType<typeof store.getState>;
    export type AppDispatch = typeof store.dispatch;
    export const useAppSelector: TypedUseSelectorHook<RootState> = (state: RootState) => state;

    export default store;