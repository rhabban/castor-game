import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Worker} from "./Workers";

const initWorkerList = () => {
    return [new Worker("Coco"), new Worker("Hugo")];
}

const workersSlice = createSlice({
    name: "workers",
    initialState: initWorkerList(),
    reducers: {
        resetWorkerList: () => {
            return initWorkerList()
        },
        addBuildingToWorker: (state, action) => {
            return state.map((worker) => {
                if (worker.id === action.payload.workerId) {
                    worker.buildingId = action.payload.buildingId;
                }
                return worker
            });
        },
        removeAllFromBuildingId: (state, action: PayloadAction<string>) => {
            return state.map((worker) => {
                if (worker.buildingId === action.payload) {
                    worker.buildingId = null;
                }
                return worker
            });
        }
    }
})
export const {
    addBuildingToWorker,
    resetWorkerList,
    removeAllFromBuildingId
} = workersSlice.actions;

export default workersSlice;