import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import WorkerError from "../../error/WorkerError";
import {BuildingPrototype, BuildingTypeEnum} from "./model/BuildingPrototype";
import BuildingFactory from "./model/BuildingFactory";

const initBuildings = () => {
    return new Array<BuildingPrototype>(
        BuildingFactory.getInstance().getPrototype(BuildingTypeEnum.LUMBER_CAMP).clone(),
        BuildingFactory.getInstance().getPrototype(BuildingTypeEnum.LUMBER_MILL).clone(),
    )
}

const buildingSlice = createSlice({
    name: "building",
    initialState: initBuildings(),
    reducers: {
        setIsEnabled: (buildingListState, action) => {
            const {selectedBuildingId, value} = action.payload;
            return buildingListState.map((building: BuildingPrototype) => {
                    if (building.id === selectedBuildingId)
                        building.isEnabled = value;
                    return building
                }
            )

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
            buildingListState.push(BuildingFactory.getInstance().getPrototype(action.payload).clone() as BuildingPrototype)
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
    setIsEnabled,
    addBuilding,
    deleteBuilding,
    addWorkerToBuilding,
    removeAllWorkerFromBuilding,
    resetBuildingList
} = buildingSlice.actions;

export default buildingSlice;