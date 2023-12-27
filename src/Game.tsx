import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Ressources from "./components/ressource/Ressources";
import Buildings from "./components/building/Buildings";
import {useAppDispatch, useAppSelector} from "./store/storeHooks";
import {FaForwardStep} from "react-icons/fa6";
import {addGameEvent, resetGameEvent} from "./components/gameEvent/gameEventSlice";
import {GameEventEntity} from "./components/gameEvent/GameEventEntity";
import GameEventLogger from "./components/gameEvent/GameEventLogger";

import GameContext from "./context/GameContext";
import useHandleTurn, {ISequence} from "./hooks/useHandleTurn";
import Workers from "./components/worker/Workers";
import Missions from "./components/mission/Missions";
import {resetMissionList, setMissions} from "./components/mission/MissionsSlice";
import {resetRessource} from "./components/ressource/ressourcesSlice";
import {resetWorkerList} from "./components/worker/workersSlice";
import {FaDoorOpen} from "react-icons/fa";
import {fireNewlevel} from "./helpers/swalHelpers";
import LevelConfig from "./components/level/LevelConfig";
import LevelPrototype from "./components/level/LevelPrototype";
import {resetBuildingList} from "./components/building/buildingSlice";

const initSequence: ISequence = {
    turn: 0,
    isProcessing: false,
    isTerminated: false,
    level: 0,
}

function Game({setEndGame}: { setEndGame: Function }) {

    const workerList = useAppSelector((state) => state.workers);
    const dispatch = useAppDispatch();

    const availableWorkers = useMemo(() => {
        return workerList.filter((worker) => (worker.buildingId === null))
    }, [workerList]);

    const [sequence, setSequence] = useState<ISequence>(initSequence);

    const {
        turn, isProcessing, isTerminated, level
    } = useHandleTurn(sequence);


    useEffect(() => {
        dispatch(resetRessource());
        dispatch(resetWorkerList());
        dispatch(resetMissionList());
        dispatch(resetGameEvent());

        (async () => {
            dispatch(resetBuildingList())
        })().then(() => highlightElement()
        )

        setSequence(initSequence);

    }, []);

    useEffect(() => {
        if (isTerminated) {
            console.log('le jeu est terminé')
            setEndGame();
        }
    }, [isTerminated]);

    useEffect(() => {
        highlightElement();
    }, [level]);

    const highlightElement = () => {
        const newLevel: LevelPrototype = LevelConfig.getInstance().getLevel(level)
        fireNewlevel(newLevel.description)
        dispatch(setMissions(newLevel.missions))

        const prevElementToHighLight = document.querySelectorAll(".highlightedBox")
        prevElementToHighLight.forEach(element => {
            element.classList.remove("highlightedBox")
        })

        const elementToHighlight = document.querySelectorAll(newLevel.selectorElementToHighlight || "");
        if (elementToHighlight && elementToHighlight[0]) {
            elementToHighlight[0].classList.add("highlightedBox")
        }
    }

    const onClickPlayTurn = () => {
        dispatch(addGameEvent(new GameEventEntity("Fin du tour demandé", "turn", turn)))
        setSequence({...sequence, turn: turn, isProcessing: true})
    }

    const onClickEndGame = () => {
        setEndGame();
    }

    return (
        <>
            <GameContext.Provider
                value={{turn: turn, isProcessing: isProcessing, availableWorkers: availableWorkers, level: level}}>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <Ressources/>
                            <Workers/>
                            <Missions/>
                            <GameEventLogger/>
                        </div>
                        <div className="col-8">
                            <Buildings/>
                        </div>

                    </div>
                </div>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
                    <div className={"row mx-auto col-3"}>
                        <div className="col-6 text-center">
                            <button className={"btn btn-lg btn-success position-relative"}
                                    onClick={onClickPlayTurn} disabled={isProcessing}>
                                <FaForwardStep/> Play
                                turn
                                <span
                                    className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"}>{turn.toString()}</span>
                            </button>
                        </div>
                        <div className="col-6 text-center">
                            <button className={"btn btn-lg btn-danger position-relative"}
                                    onClick={() => setEndGame()}>
                                <FaDoorOpen/> Exit Game
                            </button>
                        </div>
                    </div>

                </nav>
            </GameContext.Provider>

        </>
    );
}

export default Game;
