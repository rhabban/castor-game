import {useAppSelector} from "../store/Hooks";
import React from "react";

const Logger = () => {

    const eventActionList = useAppSelector((state) => state.eventAction);

    if (eventActionList && eventActionList.length > 0) {
        console.log("eventActionList", eventActionList);
        const reversedList = [...eventActionList]

        console.log("eventActionList REV", reversedList);

        return (
            <>
                <h3>Logger</h3>
                <ul className="list-group">
                    {
                        reversedList.reverse().map((eventAction) => (
                            <li key={eventAction.id}
                                className={"list-group-item" + (eventAction.turn % 2 === 0 ? " list-group-item-secondary" : "")}>
                                turn {eventAction.turn} | {eventAction.message}

                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }
    return <></>
}
export default Logger;