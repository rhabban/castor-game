import {useEffect, useState} from "react";
import {
    fireEndTourEvent,
    fireMissionSuccessful,
    fireRessourceError,
    fireTurnIsProcessing,
    fireVictory,
} from "../helpers/swalHelpers";
import {useAppDispatch, useAppSelector} from "../store/storeHooks";
import {addGameEvent} from "../components/gameEvent/gameEventSlice";
import {GameEventEntity} from "../components/gameEvent/GameEventEntity";
import {completeMission} from "../components/mission/MissionsSlice";
import {decrementRessource, incrementRessource} from "../components/ressource/ressourcesSlice";
import {RessourceError} from "../error/customErrors";
import {wait} from "../helpers/commonHelpers";


export interface sequence {
    turn: number,
    isProcessing: boolean,
}

export default function useHandleTurn(sequence: sequence) {

    const [turn, setTurn] = useState(sequence.turn)
    const [isProcessing, setIsProcessing] = useState(sequence.isProcessing)
    const [isTerminated, setIsTerminated] = useState(false)

    const buildingList = useAppSelector((state) => state.building);
    const ressources = useAppSelector((state) => state.ressources);
    const missions = useAppSelector((state) => state.missions);
    const dispatch = useAppDispatch();

    useEffect(() => {
        executeAction();
    }, [sequence])

    useEffect(() => {
        dispatch(addGameEvent(new GameEventEntity("Début du tour", "turn", turn)))

        if (turn > 0) {
            validateMission();
        }
    }, [turn]);

    useEffect(() => {
        if (turn > 0) {
            const activeMission = missions.filter(mission =>
                !mission.isCompleted
            )
            if (activeMission.length === 0) {
                setIsProcessing(false);
                fireVictory(() => setIsTerminated(true));
            }
        }

    }, [missions]);

    const executeAction = () => {
        if (sequence.isProcessing) {
            setIsProcessing(true);
            fireTurnIsProcessing();

            (async () => {
                await wait(1000);
                const endTurnRessource = ressources.slice();
                calculateRessources();
                return 42
            })().then((res) => {
                fireEndTourEvent(sequence.turn)
                setTurn(sequence.turn + 1)
            }).catch((err) => {
                if (err instanceof RessourceError) {
                    dispatch(addGameEvent(new GameEventEntity("Manque de " + err.ressourceType + " pour terminer le tour", "turn", turn)))
                    fireRessourceError(err.message)
                } else {
                    throw err;
                }
            }).finally(() => {
                setIsProcessing(false);
            });
        }
    }

    const calculateRessources = () => {
        buildingList.forEach(building => {
            if (building.isEnabled) {
                dispatch(decrementRessource({
                    ressourceType: building.ressourceTypeIn,
                    quantity: building.quantityIn
                }))
                dispatch(addGameEvent(new GameEventEntity(building.name + " consomme " + building.quantityIn + " " + building.ressourceTypeIn, "decrementRessource", turn)))

                dispatch(incrementRessource({
                    ressourceType: building.ressourceTypeOut,
                    quantity: building.quantityOut
                }))
                dispatch(addGameEvent(new GameEventEntity(building.name + " produit " + building.quantityOut + " " + building.ressourceTypeOut, "incrementRessource", turn)))
            }
        })
    }

    const validateMission = () => {
        missions.forEach(mission => {
            if (!mission.isCompleted && mission.validate(ressources)) {
                dispatch(completeMission(mission.id))
                dispatch(addGameEvent(new GameEventEntity("Mission " + mission.name + " terminée", "mission", turn)))
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