import React, {useState} from 'react';
import './App.css';
import Ressources from "./components/Ressources";
import Buildings from "./components/Buildings";
import {useAppDispatch} from "./store/Hooks";
import {FaRepeat} from "react-icons/fa6";
import {addEventAction} from "./store/EventActionSlice";
import {EventActionEntity} from "./components/EventActionEntity";
import Logger from "./components/Logger";

import GameContext from "./context/GameContext";
import useHandleTurn from "./hooks/useHandleTurn";
import Workers from "./components/Workers";

function Game() {

    const dispatch = useAppDispatch();

    const [sequence, setSequence] = useState({
        turn: 0,
        isProcessing: false,
    });

    const {
        turn,
        isProcessing,
    } = useHandleTurn(sequence);

    const onPlayTurn = () => {
        dispatch(addEventAction(new EventActionEntity("Fin du tour demandé", "turn", turn)))
        setSequence({...sequence, turn: turn, isProcessing: true})
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
                                    {!isProcessing ?

                                        <button className={"btn-lg btn-success position-relative "}
                                                onClick={onPlayTurn}>
                                            <FaRepeat/> Play
                                            turn
                                            <span
                                                className={"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"}>{turn.toString()}</span>
                                        </button>
                                        : <h1>Loading</h1>
                                    }
                                </div>

                            </div>
                            <div className="row">
                                <Buildings/>
                            </div>
                        </div>
                        <div className={"col-4"}>
                            <Logger/>
                        </div>

                    </div>
                </div>
            </GameContext.Provider>
        </>
    );
}

export default Game;
