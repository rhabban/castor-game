import {createSlice} from "@reduxjs/toolkit";
import {EventActionEntity} from "../components/EventActionEntity";

const eventActionSlice = createSlice({
    name: "eventAction",
    initialState: new Array<EventActionEntity>(),
    reducers: {
        addEventAction: (eventActionState, action) => {
            eventActionState.push(action.payload);
            console.log('addEventAction');
        }
    }
})
export const {addEventAction} = eventActionSlice.actions;

export default eventActionSlice;