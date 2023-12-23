import React from "react";
import {useAppSelector} from "../../store/storeHooks";
import {v4 as uuidv4} from "uuid";

export interface IWorker {
    id: string;

    name: string;
    buildingId: string | null;
}

export class Worker implements IWorker {
    id: string;

    name;
    buildingId: string | null;

    constructor(name: string) {
        this.id = uuidv4();

        this.name = name;
        this.buildingId = null;
    }
}

export const Workers = () => {

    const workerList = useAppSelector((state) => state.workers);
    const buildingList = useAppSelector((state) => state.building);

    console.log("Workers render")

    const calculateBuildingName = (buildingId: string | null) => {
        const selectedBuilding = buildingList.find((building) => (building.id === buildingId));
        return selectedBuilding?.name;
    }

    if (!workerList)
        return <></>

    return (
        <>
            <h3>Workers</h3>

            <table className={"table"}>
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Poste</th>
                </tr>
                </thead>
                <tbody>
                {
                    workerList.map((worker) => (
                        <tr key={worker.id}>
                            <td>{worker.name}</td>
                            <td>{calculateBuildingName(worker.buildingId)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </>
    )
}
export default Workers;