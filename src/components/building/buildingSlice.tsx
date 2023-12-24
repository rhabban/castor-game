import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import WorkerError from "../../error/WorkerError";
import {BuildingPrototype, BuildingTypeEnum} from "./model/BuildingPrototype";
import BuildingStore from "./model/BuildingStore";

const initBuildings = () => {
    return new Array<BuildingPrototype>(
        BuildingStore.getInstance().getPrototype(BuildingTypeEnum.LUMBER_CAMP).clone(),
        BuildingStore.getInstance().getPrototype(BuildingTypeEnum.LUMBER_MILL).clone(),
    )
}

const buildingSlice = createSlice({
    name: "building",
    initialState: initBuildings(),
    reducers: {
        toggleActivate: (buildingListState, action) => {
            const idxSelectedBuilding: number = buildingListState.findIndex(building => building?.id === action.payload.id);

            if (!idxSelectedBuilding === undefined || !buildingListState[idxSelectedBuilding] === undefined)
                throw Error;

            let selectedBuilding = buildingListState[idxSelectedBuilding]?.clone();

            if (!selectedBuilding)
                throw Error;
            selectedBuilding.isEnabled = !selectedBuilding.isEnabled;
            buildingListState[idxSelectedBuilding] = selectedBuilding;

        },
        addWorkerToBuilding: (state, action) => {
            return state.map((building) => {
                if (building.id === action.payload.buildingId) {
                    building.workersId.push(action.payload.workerId);
                }
                return building;
            })
        },
        removeAllWorkerFromBuilding: (state, action: PayloadAction<string>) => {
            return state.map((building) => {
                if (building.id === action.payload)
                    building.workersId = []
                return building;
            })
        },
        addBuilding: (buildingListState, action: PayloadAction<BuildingTypeEnum>) => {
            buildingListState.push(BuildingStore.getInstance().getPrototype(action.payload))
        },
        deleteBuilding: (buildingListState, action) => {
            if (action.payload.workersId.length > 0)
                throw new WorkerError("Veuillez retirer les ouvriers");
            return buildingListState.filter(building => building.id !== action.payload.id);
        },
        resetBuildingList: () => {
            return initBuildings();
        }
    }
})
export const {
    toggleActivate,
    addBuilding,
    deleteBuilding,
    addWorkerToBuilding,
    removeAllWorkerFromBuilding,
    resetBuildingList
} = buildingSlice.actions;

export default buildingSlice;