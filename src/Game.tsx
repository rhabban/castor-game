import React, {useEffect, useState} from 'react';
import './App.css';
import Ressources from "./components/ressource/Ressources";
import Buildings from "./components/building/Buildings";
import {useAppDispatch} from "./store/storeHooks";
import {FaForwardStep} from "react-icons/fa6";
import {addGameEvent, resetGameEvent} from "./components/gameEvent/gameEventSlice";
import {GameEventEntity} from "./components/gameEvent/GameEventEntity";
import GameEventLogger from "./components/GameEventLogger";

import GameContext from "./context/GameContext";
import useHandleTurn from "./hooks/useHandleTurn";
import Workers from "./components/worker/Workers";
import Missions from "./components/mission/Missions";
import {resetMissionList} from "./components/mission/MissionsSlice";
import {resetRessource} from "./components/ressource/ressourcesSlice";
import {resetWorkerList} from "./components/worker/workersSlice";
import {FaDoorOpen} from "react-icons/fa";
import {resetBuildingList} from "./components/building/buildingSlice";

function Game({setEndGame}: { setEndGame: Function }) {

    const dispatch = useAppDispatch();

    const initSequence = {
        turn: 0,
        isProcessing: false,
        isTerminated: false
    }

    const [sequence, setSequence] = useState(initSequence);

    const {
        turn,
        isProcessing,
        isTerminated
    } = useHandleTurn(sequence);

    useEffect(() => {
        dispatch(resetRessource());
        dispatch(resetWorkerList());
        dispatch(resetMissionList());
        dispatch(resetBuildingList());
        dispatch(resetGameEvent());
        setSequence(initSequence);
    }, []);

    useEffect(() => {
        if (isTerminated === true) {
            console.log('le jeu est terminé')
            setEndGame();
        }
    }, [isTerminated]);

    const onClickPlayTurn = () => {
        dispatch(addGameEvent(new GameEventEntity("Fin du tour demandé", "turn", turn)))
        setSequence({...sequence, turn: turn, isProcessing: true})
    }

    const onClickEndGame = () => {
        setEndGame();
    }

    return (
        <>
            <GameContext.Provider value={{turn: turn, isProcessing: isProcessing}}>
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
