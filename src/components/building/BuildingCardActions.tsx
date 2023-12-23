import {BuildingEntity} from "./BuildingEntity";
import React, {useContext} from "react";
import {IWorker} from "../worker/Workers";
import {useAppDispatch} from "../../store/storeHooks";
import {addGameEvent} from "../gameEvent/gameEventSlice";
import {GameEventEntity} from "../gameEvent/GameEventEntity";
import workersSlice, {editWorker} from "../worker/workersSlice";
import buildingSlice, {addWorkerToBuilding, deleteBuilding, toggleActivate} from "./buildingSlice";
import GameContext from "../../context/GameContext";

const BuildingCardActions = ({building, availableWorkers}: {
    building: BuildingEntity,
    availableWorkers: IWorker[]
}) => {

    const dispatch = useAppDispatch()
    const gameContext = useContext(GameContext);

    const onClickAddWorker = (worker: IWorker) => {
        worker.buildingId = building.id;
        dispatch(editWorker(worker))
        dispatch(addWorkerToBuilding({workerId: worker.id, buildingId: building.id}))
        dispatch(toggleActivate(building))
        dispatch(addGameEvent(new GameEventEntity(worker.name + " est affecté à " + building.name, "worker", gameContext?.turn || 0)))
    }

    const onClickRemoveWorker = () => {
        dispatch(workersSlice.actions.removeFromBuildingId(building.id))
        dispatch(buildingSlice.actions.removeAllWorkerFromBuilding(building.id))
        dispatch(toggleActivate(building))
        dispatch(addGameEvent(new GameEventEntity(building.name + " has removed all its workers", "building", gameContext?.turn || 0)))
    }

    const onClickDelete = () => {
        if (building.workersId.length > 0)
            throw Error("Veuillez retirer les ouvriers")
        dispatch(deleteBuilding(building));
        dispatch(addGameEvent(new GameEventEntity(building.name + " has been removed", "building", gameContext?.turn || 0)))
    }

    return (
        <>
            {building.workersId.length > 0 ?
                <>
                    <button className={"btn btn-sm btn-warning"}
                            onClick={() => onClickRemoveWorker()}>Remove worker
                    </button>
                </>
                :
                <>
                    <div className="dropdown">
                        <button
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown"
                            className={"btn btn-sm btn-primary dropdown-toggle"} id="affectWorker"
                        >Add worker
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="affectWorker">
                            {
                                availableWorkers.map((worker) => (
                                    <li key={worker.id}><a className="dropdown-item" href="#"
                                                           onClick={() => onClickAddWorker(worker)}>{worker.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </>
            }
            &nbsp;
            <button
                className={"btn btn-sm btn-danger"}
                onClick={onClickDelete}>Supprimer
            </button>

        </>
    )
}
export default BuildingCardActions;

