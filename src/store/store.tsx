import {configureStore} from "@reduxjs/toolkit";
import ressourcesSlice from "../components/ressource/ressourcesSlice";
import buildingSlice from "../components/building/buildingSlice";
import gameEventSlice from "../components/gameEvent/gameEventSlice";
import workersSlice from "../components/worker/workersSlice";
import missionsSlice from "../components/mission/MissionsSlice";

export const store = configureStore({
    reducer: {
        ressources: ressourcesSlice.reducer,
        building: buildingSlice.reducer,
        workers: workersSlice.reducer,
        missions: missionsSlice.reducer,
        gameEvents: gameEventSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch