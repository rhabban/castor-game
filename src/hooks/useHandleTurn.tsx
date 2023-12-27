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
import LevelConfig from "../components/level/LevelConfig";
import {ActiveBuildingMission, StockMission} from "../components/mission/Missions";
import {RessourceTypeEnum} from "../components/ressource/model/RessourcePrototype";


export interface ISequence {
    turn: number,
    isProcessing: boolean,
    isTerminated: boolean,
    level: number
}

export default function useHandleTurn(sequence: ISequence) {

    const [turn, setTurn] = useState(sequence.turn)
    const [isProcessing, setIsProcessing] = useState(sequence.isProcessing)
    const [isTerminated, setIsTerminated] = useState(sequence.isTerminated)
    const [level, setLevel] = useState(sequence.level)

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
                if (LevelConfig.getInstance().getMaxlevel() === level)
                    fireVictory(() => setIsTerminated(true));
                else
                    setLevel(level + 1);
            }
        }

    }, [missions]);

    const executeAction = () => {
        if (sequence.isProcessing) {
            setIsProcessing(true);
            fireTurnIsProcessing();

            let deltaRessource = new Map<RessourceTypeEnum, number>();
            (async () => {
                await wait(1000);
                const endTurnRessource = ressources.slice();
                calculateRessources(deltaRessource);
                return 42
            })().then((res) => {
                fireEndTourEvent(sequence.turn, deltaRessource)
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

    const calculateRessources = (deltaRessource: Map<RessourceTypeEnum, number>) => {
        buildingList.forEach(building => {
            if (building.isEnabled) {
                dispatch(decrementRessource({
                    ressourceType: building.ressourceTypeIn,
                    quantity: building.quantityIn
                }))
                dispatch(addGameEvent(new GameEventEntity(building.name + " consomme " + building.quantityIn + " " + building.ressourceTypeIn, "decrementRessource", turn)))
                deltaRessource.set(building.ressourceTypeIn, building.quantityIn)
                dispatch(incrementRessource({
                    ressourceType: building.ressourceTypeOut,
                    quantity: building.quantityOut
                }))
                dispatch(addGameEvent(new GameEventEntity(building.name + " produit " + building.quantityOut + " " + building.ressourceTypeOut, "incrementRessource", turn)))
                deltaRessource.set(building.ressourceTypeOut, building.quantityOut)
            }
        })
    }

    const validateMission = () => {
        missions.forEach(mission => {
            if (!mission.isCompleted) {
                let validate = false;
                if (mission instanceof StockMission)
                    validate = mission.validate(ressources) || false
                if (mission instanceof ActiveBuildingMission)
                    validate = mission.validate(buildingList) || false
                if (validate) {
                    dispatch(completeMission(mission.id))
                    dispatch(addGameEvent(new GameEventEntity("Mission " + mission.name + " terminée", "mission", turn)))
                    fireMissionSuccessful(mission)
                }
            }
        })
    }

    return {
        turn,
        isProcessing,
        isTerminated,
        level
    };

}