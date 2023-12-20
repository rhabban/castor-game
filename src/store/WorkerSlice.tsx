import {createSlice} from "@reduxjs/toolkit";
import {IWorker} from "../components/Workers";

const initWorkerList: IWorker[] = [{name: "Coco", isWorking: false}, {name: "Hugo", isWorking: false}];

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
            console.log("editWorker reducer");
        }
    }
})
export const {editWorker} = workerSlice.actions;

export default workerSlice;