import {useAppSelector} from "../../store/storeHooks";
import React from "react";

export const GameEventLogger = () => {

    const gameEvents = useAppSelector((state) => state.gameEvents);

    if (gameEvents && gameEvents.length > 0) {
        const reversedList = [...gameEvents]

        return (
            <>
                <div className="overflow-auto" style={{height: "400px"}}>
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
                </div>
            </>
        )
    }

    return <></>
}
export default GameEventLogger;