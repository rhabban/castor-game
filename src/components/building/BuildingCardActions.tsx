import React, {useContext} from "react";
import {IWorker} from "../worker/Workers";
import {useAppDispatch} from "../../store/storeHooks";
import {addGameEvent} from "../gameEvent/gameEventSlice";
import {GameEventEntity} from "../gameEvent/GameEventEntity";
import {addBuildingToWorker, removeAllFromBuildingId} from "../worker/workersSlice";
import {addWorkerToBuilding, deleteBuilding, removeAllWorkerFromBuilding, setIsEnabled} from "./buildingSlice";
import GameContext from "../../context/GameContext";
import {RessourceError} from "../../error/customErrors";
import {fireRessourceError} from "../../helpers/swalHelpers";
import {BuildingPrototype} from "./model/BuildingPrototype";

const BuildingCardActions = ({building}: {
    building: BuildingPrototype,
}) => {

    const dispatch = useAppDispatch()
    const gameContext = useContext(GameContext);

    const onClickAddWorker = (worker: IWorker) => {
        dispatch(addBuildingToWorker({workerId: worker.id, buildingId: building.id}))
        dispatch(addWorkerToBuilding({workerId: worker.id, buildingId: building.id}))
        dispatch(setIsEnabled({buildingId: building.id, value: true}))
        dispatch(addGameEvent(new GameEventEntity(worker.name + " est affecté à " + building.name, "worker", gameContext?.turn || 0)))
    }

    const onClickRemoveWorker = () => {
        dispatch(removeAllFromBuildingId(building.id))
        dispatch(removeAllWorkerFromBuilding(building.id))
        dispatch(setIsEnabled({buildingId: building.id, value: false}))
        dispatch(addGameEvent(new GameEventEntity(building.name + " has removed all its workers", "building", gameContext?.turn || 0)))
    }

    const onClickDelete = () => {
        (async () => {
            dispatch(deleteBuilding(building));
        })().then(() => {
            dispatch(addGameEvent(new GameEventEntity(building.name + " has been removed", "building", gameContext?.turn || 0)))
        }).catch((err: RessourceError) => {
            fireRessourceError(err.message)
        }).catch((err) => {
            throw err
        });

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
                                gameContext?.availableWorkers?.map((worker) => (
                                    <li key={worker.id}>
                                        <button className="dropdown-item"
                                                onClick={() => onClickAddWorker(worker)}>{worker.name}</button>
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

