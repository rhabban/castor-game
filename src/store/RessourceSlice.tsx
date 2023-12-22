import {RessourceTypeEnum} from "../components/Ressource";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

let iRessourceRecord: Record<RessourceTypeEnum[keyof RessourceTypeEnum & number], number> = {
    [RessourceTypeEnum.BOIS]: 5,
    [RessourceTypeEnum.PLANCHE]: 1,
}

const ressourceSlice = createSlice({
    name: "ressource",
    initialState: iRessourceRecord,
    reducers: {
        incrementRessource: (state, action) => {
            if (state[action.payload.ressourceType] === undefined) {
                state[action.payload.ressourceType] = action.payload.value
            } else {
                state[action.payload.ressourceType] = state[action.payload.ressourceType] + action.payload.value;
            }
        },
        decrementRessource: (state, action) => {
            if (state[action.payload.ressourceType] === undefined)
                throw Error("Ressource doesn't exists");

            const newCount = state[action.payload.ressourceType] - action.payload.value;
            if (newCount < 0)
                throw Error("Ressource non disponible");

            state[action.payload.ressourceType] = newCount;
        },
        resetRessource: () => {
            return iRessourceRecord;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, () => {
            console.log("logAsync.pending")
        }).addCase(incrementAsync.fulfilled, (state, action) => {
            console.log("logAsync.fulfilled");
            state[action.payload.ressource] = state[action.payload.ressource] + action.payload.value;
        });
    }
})

export const incrementAsync = createAsyncThunk(
    "ressource/incrementAsync",
    async ({ressource, value}: { ressource: string, value: number }) => {
        console.log(ressource + " ASYNC AVT PROMISE")

        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(ressource + " ASYNC AFTER PROMISE")
        return {ressource, value};
    }
)

export default ressourceSlice;
export const {incrementRessource, decrementRessource, resetRessource} = ressourceSlice.actions;