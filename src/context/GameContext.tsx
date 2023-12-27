"use client"

//export const GameContext = createContext();

import {createContext} from "react";
import {IWorker} from "../components/worker/Workers";

export interface IGameContext {
    turn: number;
    isProcessing: boolean;
    availableWorkers: IWorker[];
    level: number;
    isCheatEnable: boolean;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

const GameDispatchContext = createContext(null);
export default GameContext;
