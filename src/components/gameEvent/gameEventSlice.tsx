import {createSlice} from "@reduxjs/toolkit";
import {GameEventEntity} from "./GameEventEntity";

const initialState = () => {
    return new Array<GameEventEntity>();
}

const gameEventSlice = createSlice({
    name: "gameEvents",
    initialState: initialState(),
    reducers: {
        addGameEvent: (state, action) => {
            state.push(action.payload);
        },
        resetGameEvent: () => {
            return initialState();
        }
    }
})
export const {addGameEvent, resetGameEvent} = gameEventSlice.actions;

export default gameEventSlice;