import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMission, StockMission} from "./Missions";
import {RessourceTypeEnum} from "../ressource/model/RessourcePrototype";

const initMissionList = () => {
    return [
        new StockMission("Collecter 10 bois", RessourceTypeEnum.WOOD, 10),
        new StockMission("Collecter 2 planches", RessourceTypeEnum.PLANK, 2)
    ]
};


const missionsSlice = createSlice({
    name: "missions",
    initialState: new Array<IMission>(),
    reducers: {
        completeMission: (missionState, action) => {
            const newMissionList = missionState.map((mission) => {
                if (mission.id === action.payload) {
                    return {...mission, isCompleted: true}
                }
                return mission;
            });
            return newMissionList
        },

        setMissions: (missionState, action: PayloadAction<IMission[]>) => {
            missionState = action.payload;
            return missionState;
        },

        resetMissionList: () => {
            return [];
        }

    }
})
export const {completeMission, resetMissionList, setMissions} = missionsSlice.actions;

export default missionsSlice;