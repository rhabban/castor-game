import {createSlice} from "@reduxjs/toolkit";

const eventActionSlice = createSlice({
    name: "eventAction",
    initialState: [],
    reducers: {
        addEventAction: (eventActionState, action) => {
            eventActionState.push(action.eventAction);
        }
    }
})
export const {addEventAction} = eventActionSlice.actions;

export default eventActionSlice;