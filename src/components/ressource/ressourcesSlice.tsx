import {RessourcePrototype, RessourceTypeEnum} from "./model/RessourcePrototype";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RessourceError} from "../../error/customErrors";
import RessourceFactory from "./model/RessourceFactory";

const initRessources = () => {
    return new Array<RessourcePrototype>(
        RessourceFactory.getInstance().getPrototype(RessourceTypeEnum.WOOD).cloneWithSpecificQuantity(5),
        RessourceFactory.getInstance().getPrototype(RessourceTypeEnum.PLANK).cloneWithSpecificQuantity(1),
    )
}

const ressourcesSlice = createSlice({
    name: "ressources",
    initialState: initRessources(),
    reducers: {
        incrementRessource: (state, action) => {
            let isNewRessource = true;
            state = state.map((ressource) => {
                if (ressource.type === action.payload.ressourceType) {
                    ressource = RessourceFactory.getInstance().getPrototype(ressource.type).cloneWithSpecificQuantity(ressource.quantity + action.payload.quantity)
                    isNewRessource = false;
                }
                return ressource;
            });
            if (isNewRessource) {
                state.push(RessourceFactory.getInstance().getPrototype(action.payload.ressourceType).cloneWithSpecificQuantity(action.payload.quantity))
            }
            return state;
        },
        decrementRessource: (state, action) => {
            let isNewRessource = true;
            state = state.map((ressource) => {
                if (ressource.type === action.payload.ressourceType) {
                    const newQty = ressource.quantity - action.payload.quantity;

                    if (newQty < 0)
                        throw new RessourceError("Not enough " + action.payload.ressourceType, action.payload.ressourceType);

                    ressource = RessourceFactory.getInstance().getPrototype(ressource.type).cloneWithSpecificQuantity(newQty)
                    isNewRessource = false;
                }
                return ressource;
            });
            if (isNewRessource) {
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
        }).addCase(incrementAsync.fulfilled, () => {
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