import {useEffect, useState} from "react";
import {fireEndTourEvent, wait} from "../helpers/helper";
import {useAppDispatch, useAppSelector} from "../store/Hooks";
import {addEventAction} from "../store/EventActionSlice";
import {EventActionEntity} from "../components/EventActionEntity";


export interface sequence {
    turn: number,
    isProcessing: boolean,
}

export default function useHandleTurn(sequence: sequence) {

    const [turn, setTurn] = useState(sequence.turn)
    const [isProcessing, setIsProcessing] = useState(sequence.isProcessing)

    const buildingList = useAppSelector((state) => state.building);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("UE.seq : ", sequence.isProcessing);
        executeAction();
    }, [sequence])

    const executeAction = () => {
        if (sequence.isProcessing) {
            setIsProcessing(true);

            (async () => {
                await wait(2000);
                calculateRessources();
                fireEndTourEvent(sequence.turn)
                setTurn(sequence.turn + 1)
                setIsProcessing(false);
                dispatch(addEventAction(new EventActionEntity("Début du tour", "turn", turn + 1)))

            })();
        }
    }

    const calculateRessources = () => {
        buildingList.forEach(building => {
            if (building.isEnabled) {
                if (building.quantityIn > 0) {
                    try {
                        dispatch({
                            type: "ressource/decrementRessource",
                            payload: {
                                ressourceType: building.ressourceTypeIn,
                                value: building.quantityIn
                            }
                        })
                    } catch (e) {
                        alert(e);
                    }
                    dispatch(addEventAction(new EventActionEntity(building.name + " consomme " + building.quantityIn + " " + building.ressourceTypeIn, "decrementRessource", turn)))
                }
                dispatch({
                    type: "ressource/incrementRessource",
                    payload: {
                        ressourceType: building.ressourceTypeOut,
                        value: building.quantityOut
                    }
                })
                dispatch(addEventAction(new EventActionEntity(building.name + " produit " + building.quantityOut + " " + building.ressourceTypeOut, "incrementRessource", turn)))
            }
        })
    }

    return {
        turn,
        isProcessing,
    };

}