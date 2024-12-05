// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import transferReducer from "../features/transfers/TransferSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import returnablesReducer from "../features/returnables/ReturnablesSlice";
import usersReducer from "../features/settings/UsersSlice";
import alertsReducer from "../features/alerts/AlertsSlice";
import baseApi from "../utils/api";

// Persist configuration for the entire store
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist the auth reducer
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    dashboard: dashboardReducer,
    transfer: transferReducer,
    notifications: notificationsReducer,
    returnables: returnablesReducer,
    users: usersReducer,
    alerts: alertsReducer,
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
