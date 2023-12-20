import {configureStore} from "@reduxjs/toolkit";
import ressourceSlice from "./RessourceSlice";
import buildingSlice from "./BuildingSlice";
import eventAction from "./EventActionSlice";
import workerSlice from "./WorkerSlice";

export const store = configureStore({
    reducer: {
        ressource: ressourceSlice.reducer,
        building: buildingSlice.reducer,
        worker: workerSlice.reducer,
        eventAction: eventAction.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch