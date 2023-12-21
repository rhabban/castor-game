import {createSlice} from "@reduxjs/toolkit";
import {RessourceTypeEnum} from "../components/Ressource";
import {BuildingEntity} from "../components/BuildingEntity";


const build1: BuildingEntity = new BuildingEntity("scierie", RessourceTypeEnum.PLANCHE, 1, RessourceTypeEnum.BOIS, 5);
const build2: BuildingEntity = new BuildingEntity("carrière", RessourceTypeEnum.PIERRE, 2, RessourceTypeEnum.PIERRE, 0);
const iBuildingList: Array<BuildingEntity> = [build1, build2]

const buildingSlice = createSlice({
    name: "building",
    initialState: iBuildingList,
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
        removeWorkerFromBuilding: (buildingListState, action) => {
            return buildingListState.map((building) => {
                if (building.id === action.payload.buildingId) {
                    building.workersId = building.workersId.filter(workerId => workerId !== action.payload.workerId);
                }
                return building;
            })
        },
        addBuilding: (buildingListState, action) => {
            buildingListState.push(new BuildingEntity("foret", RessourceTypeEnum.BOIS, 10, RessourceTypeEnum.BOIS, 0))
        },
        deleteBuilding: (buildingListState, action) => {

            return buildingListState.filter(building => building.id !== action.payload.id);
        }
    }
})
export const {
    toggleActivate,
    addBuilding,
    deleteBuilding,
    addWorkerToBuilding,
    removeWorkerFromBuilding
} = buildingSlice.actions;

export default buildingSlice;