import {RessourceTypeEnum} from "../components/Ressource";
import {createSlice} from "@reduxjs/toolkit";

let iRessourceRecord: Record<RessourceTypeEnum[keyof RessourceTypeEnum & number], number> = {
    [RessourceTypeEnum.BOIS]: 5,
    [RessourceTypeEnum.PLANCHE]: 1,
}

const ressourceSlice = createSlice({
    name: "ressource",
    initialState: iRessourceRecord,
    reducers: {
        incrementRessource: (RessourceRecordDraft, action) => {
            if (RessourceRecordDraft[action.payload.ressourceType] === undefined) {
                RessourceRecordDraft[action.payload.ressourceType] = action.payload.value
            } else {
                RessourceRecordDraft[action.payload.ressourceType] = RessourceRecordDraft[action.payload.ressourceType] + action.payload.value;
            }
        },
        decrementRessource: (RessourceRecordDraft, action) => {
            if (RessourceRecordDraft[action.payload.ressourceType] === undefined)
                throw Error("Ressource doesn't exists");

            const newCount = RessourceRecordDraft[action.payload.ressourceType] - action.payload.value;
            if (newCount < 0)
                throw Error("Ressource non disponible");

            RessourceRecordDraft[action.payload.ressourceType] = newCount;
        }
    }
})

export default ressourceSlice;
export const {incrementRessource, decrementRessource} = ressourceSlice.actions;