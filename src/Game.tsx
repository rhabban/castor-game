import React, {useEffect, useState} from 'react';
import './App.css';
import Ressources from "./components/Ressources";
import Buildings from "./components/Buildings";
import {useAppDispatch} from "./store/Hooks";
import {FaForwardStep} from "react-icons/fa6";
import {addEventAction, resetEventAction} from "./store/EventActionSlice";
import {EventActionEntity} from "./components/EventActionEntity";
import Logger from "./components/Logger";

import GameContext from "./context/GameContext";
import useHandleTurn from "./hooks/useHandleTurn";
import Workers from "./components/Workers";
import Missions from "./components/mission/Missions";
import {resetMissionList} from "./store/MissionSlice";
import {resetRessource} from "./store/RessourceSlice";
import {resetWorkerList} from "./store/WorkerSlice";
import {FaDoorOpen} from "react-icons/fa";

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
        dispatch(resetMissionList());
        dispatch(resetRessource());
        dispatch(resetWorkerList());
        dispatch(resetEventAction());
        setSequence(initSequence);
    }, []);

    useEffect(() => {
        if (isTerminated === true) {
            console.log('le jeu est terminé')
            setEndGame();
        }
    }, [isTerminated]);

    const onClickPlayTurn = () => {
        dispatch(addEventAction(new EventActionEntity("Fin du tour demandé", "turn", turn)))
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
                        <div className="col-8">
                            <div className="row">
                                <div className="col-5">
                                    <Ressources/>
                                </div>
                                <div className="col-3">
                                    <Workers/>
                                </div>
                                <div className="col-4 align-self-center">

                                </div>

                            </div>
                            <div className="row">
                                <Buildings/>
                            </div>
                        </div>
                        <div className={"col-4"}>
                            <Missions/>
                            <Logger/>
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
                                    onClick={onClickEndGame}>
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
