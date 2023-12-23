import {createSlice} from "@reduxjs/toolkit";
import {StockMission} from "./Missions";
import {RessourceTypeEnum} from "../ressource/Ressource";

const initMissionList = () => {
    return [
        new StockMission("Collecter 10 bois", RessourceTypeEnum.BOIS, 10),
        new StockMission("Collecter 2 planches", RessourceTypeEnum.PLANCHE, 2)
    ]
};


const missionsSlice = createSlice({
    name: "missions",
    initialState: initMissionList(),
    reducers: {
        completeMission: (missionList, action) => {
            const newMissionList: StockMission[] = missionList.map((mission) => {
                if (mission.id === action.payload) {
                    return {...mission, isCompleted: true}
                }
                return mission;
            });
            return newMissionList
        },

        resetMissionList: () => {
            return initMissionList();
        }

    }
})
export const {completeMission, resetMissionList} = missionsSlice.actions;

export default missionsSlice;