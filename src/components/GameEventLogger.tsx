import {useAppSelector} from "../store/storeHooks";
import React from "react";

export const GameEventLogger = () => {

    const gameEvents = useAppSelector((state) => state.gameEvents);

    if (gameEvents && gameEvents.length > 0) {
        console.log("gameEvents", gameEvents);
        const reversedList = [...gameEvents]

        console.log("gameEvents REV", reversedList);

        return (
            <>
                <h3>Logger</h3>
                <ul className="list-group">
                    {
                        reversedList.reverse().map((gameEvent) => (
                            <li key={gameEvent.id}
                                className={"list-group-item" + (gameEvent.turn % 2 === 0 ? " list-group-item-secondary" : "")}>
                                turn {gameEvent.turn} | {gameEvent.message}

                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }

    return <></>
}
export default GameEventLogger;