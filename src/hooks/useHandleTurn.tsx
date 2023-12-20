import {useEffect} from "react";

export default function useHandleTurnSimplified(turn: number) {

    useEffect(() => {
        console.log("turn changed", turn)
    }, [turn])
}