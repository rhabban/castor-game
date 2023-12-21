import {createSlice} from "@reduxjs/toolkit";
import {StockMission} from "../components/mission/Missions";
import {RessourceTypeEnum} from "../components/Ressource";

const initMissionList: StockMission[] = [
    new StockMission("Collecter 10 bois", RessourceTypeEnum.BOIS, 10),
    new StockMission("Collecter 2 planches", RessourceTypeEnum.PLANCHE, 2)
];

const missionSlice = createSlice({
    name: "mission",
    initialState: initMissionList,
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

        resetMissionList: (state) => {
            return initMissionList;
        }

    }
})
export const {completeMission, resetMissionList} = missionSlice.actions;

export default missionSlice;