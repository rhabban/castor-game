import {createSlice} from "@reduxjs/toolkit";
import {RessourceTypeEnum} from "../components/Ressource";
import {BuildingEntity} from "../components/BuildingEntity";


const build1: BuildingEntity = new BuildingEntity("scierie", RessourceTypeEnum.PLANCHE, 1, RessourceTypeEnum.BOIS, 5);
const build3: BuildingEntity = new BuildingEntity("carrière", RessourceTypeEnum.PIERRE, 2, RessourceTypeEnum.PIERRE, 0);
const iBuildingList: Array<BuildingEntity> = new Array<BuildingEntity>();
iBuildingList.push(build1);
iBuildingList.push(build3);

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
        addBuilding: (buildingListState, action) => {
            buildingListState.push(new BuildingEntity("foret", RessourceTypeEnum.BOIS, 10, RessourceTypeEnum.BOIS, 0))
        },
        deleteBuilding: (buildingListState, action) => {

            return buildingListState.filter(building => building.id !== action.payload.id);
        }
    }
})
export const {toggleActivate, addBuilding, deleteBuilding} = buildingSlice.actions;

export default buildingSlice;