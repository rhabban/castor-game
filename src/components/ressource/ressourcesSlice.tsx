import {RessourceType, RessourceTypeEnum} from "./Ressource";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RessourceError} from "../../error/customErrors";

const initRessources = () => {
    const ressources = new Array<RessourceType>();
    ressources.push({type: RessourceTypeEnum.BOIS, quantity: 5})
    ressources.push({type: RessourceTypeEnum.PLANCHE, quantity: 1})
    return ressources;
}

const ressourcesSlice = createSlice({
    name: "ressources",
    initialState: initRessources(),
    reducers: {
        incrementRessource: (state, action) => {
            let newRessource = true;
            state = state.map((ressource) => {
                if (ressource.type === action.payload.ressourceType) {
                    ressource = {...ressource, quantity: (ressource.quantity + action.payload.quantity)};
                    newRessource = false;
                }
                return ressource;
            });
            if (newRessource) {
                state.push({type: action.payload.ressourceType, quantity: action.payload.quantity})
            }
            console.log("clal")
            return state;
        },
        decrementRessource: (state, action) => {
            let newRessource = true;
            state = state.map((ressource) => {
                if (ressource.type === action.payload.ressourceType) {
                    const newQty = ressource.quantity - action.payload.quantity;

                    if (newQty < 0)
                        throw new RessourceError("Not enough " + action.payload.ressourceType, action.payload.ressourceType);


                    ressource = {...ressource, quantity: (ressource.quantity - action.payload.quantity)};
                    newRessource = false;
                }
                return ressource;
            });
            if (newRessource) {
                throw new RessourceError("Ressource doesn't exist", action.payload.ressourceType);
            }
            return state
        },
        resetRessource: () => {
            return initRessources();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, () => {
            console.log("logAsync.pending")
        }).addCase(incrementAsync.fulfilled, (state, action) => {
            console.log("logAsync.fulfilled");
        });
    }
})

export const incrementAsync = createAsyncThunk(
    "ressource/incrementAsync",
    async ({ressourceType, quantity}: { ressourceType: string, quantity: number }) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))


        return {ressourceType, quantity};
    }
)

export default ressourcesSlice;
export const {incrementRessource, decrementRessource, resetRessource} = ressourcesSlice.actions;