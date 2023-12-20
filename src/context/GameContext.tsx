"use client"

//export const GameContext = createContext();

import {createContext} from "react";

export interface IGameContext {
    turn: number;
    isProcessing: boolean;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

const GameDispatchContext = createContext(null);
export default GameContext;
