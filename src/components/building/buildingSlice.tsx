import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RessourceTypeEnum} from "../ressource/Ressource";
import {BuildingEntity} from "./BuildingEntity";
import WorkerError from "../../error/WorkerError";

const initBuildings = () => {
    return [
        new BuildingEntity("scierie", RessourceTypeEnum.PLANCHE, 1, RessourceTypeEnum.BOIS, 5),
        new BuildingEntity("carrière", RessourceTypeEnum.PIERRE, 2, RessourceTypeEnum.PIERRE, 0)
    ]
}

const buildingSlice = createSlice({
    name: "building",
    initialState: initBuildings(),
    reducers: {
        toggleActivate: (buildingListState, action) => {
            const idxSelectedBuilding = buildingListState.findIndex(building => building.id === action.payload.id);
            let selectedBuilding: BuildingEntity = BuildingEntity.copy(buildingListState[idxSelectedBuilding]);
            if (selectedBuilding) {
                selectedBuilding.isEnabled = !selectedBuilding.isEnabled
            }
            buildingListState[idxSelectedBuilding] = selectedBuilding;
        },
        addWorkerToBuilding: (buildingListState, action) => {
            buildingListState.map((building) => {
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
        addBuilding: (buildingListState, action) => {
            buildingListState.push(new BuildingEntity("foret", RessourceTypeEnum.BOIS, 10, RessourceTypeEnum.BOIS, 0))
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