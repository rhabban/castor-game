import {useEffect, useState} from "react";
import {fireEndTourEvent, fireMissionSuccessful, fireVictory, wait} from "../helpers/helper";
import {useAppDispatch, useAppSelector} from "../store/Hooks";
import {addEventAction} from "../store/EventActionSlice";
import {EventActionEntity} from "../components/EventActionEntity";
import Swal from "sweetalert2";
import {completeMission} from "../store/MissionSlice";


export interface sequence {
    turn: number,
    isProcessing: boolean,
}

export default function useHandleTurn(sequence: sequence) {

    const [turn, setTurn] = useState(sequence.turn)
    const [isProcessing, setIsProcessing] = useState(sequence.isProcessing)
    const [isTerminated, setIsTerminated] = useState(false)

    const buildingList = useAppSelector((state) => state.building);
    const ressourceRecord = useAppSelector((state) => state.ressource);
    const missionList = useAppSelector((state) => state.mission);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("UE.seq : ", sequence.isProcessing);
        executeAction();
    }, [sequence])

    useEffect(() => {
        if (turn > 0) {
            validateMission();
        }
    }, [turn]);

    useEffect(() => {
        if (turn > 0) {
            const activeMission = missionList.filter(mission =>
                !mission.isCompleted
            )
            if (activeMission.length === 0) {
                setIsProcessing(false);
                setIsTerminated(true);
                fireVictory();
            }
        }

    }, [missionList]);

    const executeAction = () => {
        if (sequence.isProcessing) {
            setIsProcessing(true);
            Swal.fire({
                title: "Fin du tour",
                html: "Calcul en cours",
                timer: 1000,
                timerProgressBar: true,
                showConfirmButton: false,

            });

            (async () => {
                await wait(1000);
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

    const validateMission = () => {
        missionList.forEach(mission => {
            if (!mission.isCompleted && mission.validate(ressourceRecord)) {
                dispatch(completeMission(mission.id))
                dispatch(addEventAction(new EventActionEntity("Mission " + mission.name + " terminée", "mission", turn + 1)))
                fireMissionSuccessful(mission)
            }
        })
    }

    return {
        turn,
        isProcessing,
        isTerminated
    };

}