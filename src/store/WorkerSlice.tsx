import {createSlice} from "@reduxjs/toolkit";
import {IWorker, Worker} from "../components/Workers";

const initWorkerList: IWorker[] = [new Worker("Coco"), new Worker("Hugo")];

const workerSlice = createSlice({
    name: "worker",
    initialState: initWorkerList,
    reducers: {
        editWorker: (workerListState, action) => {
            const newWorkerList: IWorker[] = workerListState.map((worker) => {
                if (worker.name === action.payload.name) {
                    worker = action.payload;
                }
                return worker;
            });
            return newWorkerList;
        },
        resetWorkerList: () => {
            return initWorkerList
        }
    }
})
export const {editWorker, resetWorkerList} = workerSlice.actions;

export default workerSlice;