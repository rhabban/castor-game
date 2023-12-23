import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IWorker, Worker} from "./Workers";

const initWorkerList = () => {
    return [new Worker("Coco"), new Worker("Hugo")];
}

const workersSlice = createSlice({
    name: "workers",
    initialState: initWorkerList(),
    reducers: {
        editWorker: (state, action) => {
            const newWorkerList: IWorker[] = state.map((worker) => {
                if (worker.name === action.payload.name) {
                    worker = action.payload;
                }
                return worker;
            });
            return newWorkerList;
        },
        resetWorkerList: () => {
            return initWorkerList()
        },
        removeFromBuildingId: (state, action: PayloadAction<string>) => {
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
    editWorker,
    resetWorkerList,
    removeFromBuildingId
} = workersSlice.actions;

export default workersSlice;