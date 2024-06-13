import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/auth/AuthSlice";
import { authApi } from "../features/auth/AuthApi";
import baseApi from '../utils/api';
import { useSelector, TypedUseSelectorHook } from "react-redux";
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import dashboardReducer from "../features/dashboard/DashboardSlice";
import transferReducer from "../features/transfers/TransferSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import returnablesReducer from "../features/returnables/ReturnablesSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // persist the auth slice
};

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    // auth: persistedAuthReducer,
    dashboard: dashboardReducer,
    transfer: transferReducer,
    notifications: notificationsReducer,
    returnables: returnablesReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
