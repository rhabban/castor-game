import {createSlice} from "@reduxjs/toolkit";
import {EventActionEntity} from "../components/EventActionEntity";

const initialState = new Array<EventActionEntity>();

const eventActionSlice = createSlice({
    name: "eventAction",
    initialState: initialState,
    reducers: {
        addEventAction: (eventActionState, action) => {
            eventActionState.push(action.payload);
        },
        resetEventAction: () => {
            return initialState;
        }
    }
})
export const {addEventAction, resetEventAction} = eventActionSlice.actions;

export default eventActionSlice;