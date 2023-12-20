import React from "react";
import {useAppSelector} from "../store/Hooks";

export interface IWorker {
    name: string;
    isWorking: boolean;
}

export class Worker implements IWorker {
    name;
    isWorking;

    constructor(name: string, isWorking: boolean) {
        this.name = name;
        this.isWorking = isWorking;
    }
}

export const Workers = () => {

    const workerList = useAppSelector((state) => state.worker);

    console.log("Workers render")

    if (!workerList)
        return <></>

    return (
        <>
            <h3>Mes ouvriers</h3>

            <table className={"table"}>
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    workerList.map((worker) => (
                        <tr>
                            <td>{worker.name}</td>
                            <td>{worker.isWorking.toString()}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </>
    )
}
export default Workers;