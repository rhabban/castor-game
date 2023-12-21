import {useAppDispatch, useAppSelector} from "../store/Hooks";
import {BuildingEntity} from "./BuildingEntity";
import {addWorkerToBuilding, deleteBuilding, removeWorkerFromBuilding, toggleActivate} from "../store/BuildingSlice";
import {addEventAction} from "../store/EventActionSlice";
import {EventActionEntity} from "./EventActionEntity";
import Swal from "sweetalert2";
import {editWorker} from "../store/WorkerSlice";
import React, {useContext} from "react";
import GameContext from "../context/GameContext";
import {IWorker} from "./Workers";

const BuildingCard = ({building}: { building: BuildingEntity }) => {
    const gameContext = useContext(GameContext);

    const workerList = useAppSelector((state) => state.worker);
    const dispatch = useAppDispatch();
    console.log("BuildingCard render;")

    const calculateWorkerName = (workerId: string) => {
        const selectedWorker = workerList.find((worker) => (worker.id === workerId));
        return selectedWorker?.name;
    }

    const workersToAvailableWorkerOptions = () => {
        let formattedOptions: { [index: string]: any } = {}
        workerList.forEach(worker => {
            if (worker.buildingId === null) {
                formattedOptions[worker.id] = worker.name
            }
        })
        return formattedOptions;
    }

    const onClickAddWorker = () => {
        Swal.fire({
            title: "Affecter un ouvrier",
            color: "#716add",
            backdrop: "rgba(0,0,123,0.4)",
            input: "select",
            inputOptions: workersToAvailableWorkerOptions(),
            inputPlaceholder: "Sélectionner...",
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    workerList.forEach(worker => {
                        if (worker.id === value) {
                            let newWorker: IWorker = {...worker, buildingId: building.id};
                            dispatch(editWorker(newWorker))
                            dispatch(addWorkerToBuilding({workerId: worker.id, buildingId: building.id}))
                            dispatch(addEventAction(new EventActionEntity(worker.name + " est affecté à " + building.name, "worker", gameContext?.turn || 0)))
                        }
                    })
                    dispatch(toggleActivate(building))
                    dispatch(addEventAction(new EventActionEntity(building.name + " isEnable= " + !building.isEnabled, "building", gameContext?.turn || 0)))
                    resolve();
                });
            }
        });

    }

    const onClickRemoveWorker = () => {
        building.workersId.forEach((workerId) => {
            dispatch(removeWorkerFromBuilding({workerId: workerId, buildingId: building.id}))
            workerList.forEach(worker => {
                    if (worker.id === workerId) {
                        dispatch(editWorker({...worker, buildingId: null}))
                    }
                }
            )
            dispatch(toggleActivate(building))
            dispatch(addEventAction(new EventActionEntity(workerId + " est retiré de " + building.name, "worker", gameContext?.turn || 0)))
            dispatch(addEventAction(new EventActionEntity(building.name + " isEnable= " + !building.isEnabled, "building", gameContext?.turn || 0)))
        });
    }

    const onClickDelete = () => {
        if (building.workersId.length > 0)
            throw Error("Veuillez retirer les ouvriers")
        dispatch(deleteBuilding(building));
        dispatch(addEventAction(new EventActionEntity(building.name + " deleted", "building", gameContext?.turn || 0)))
    }

    return (
        <>
            <div className="card col-4" style={{"padding": "0"}}>
                <img
                    src="https://images-ext-2.discordapp.net/external/10jAPDcW1_3z6EpCoXJCVstGo0H8DXtjPazPzoKYgME/%3Fcb%3D20221105224430/https/static.wikia.nocookie.net/against-the-storm/images/0/0f/Leatherworks_icon.png/revision/latest?format=webp"
                    className={"card-img-top"} alt="..."/>
                <div className="card-body"
                     style={!building.isEnabled ? {color: "gray", backgroundColor: "lightgray"} : {}}>
                    <h5 className="card-title">{building.name} {!building.isEnabled ? <em>ZzZz</em> : <></>}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{building.isEnabled ? <>actif</> : <>inactif</>}</h6>
                    <div><p>Worker :&nbsp;
                        {
                            building.workersId.map((workerId) => (
                                calculateWorkerName(workerId)
                            )).join(',')
                        }</p>
                    </div>

                    <p className="card-text"> + {building.isEnabled ? building.quantityOut : 0} {building.ressourceTypeOut} /
                        - {building.isEnabled ? building.quantityIn : 0} {building.ressourceTypeIn}</p>

                    {building.isEnabled ?
                        <button className={!gameContext?.isProcessing ? "btn btn-warning" : "btn btn-warning disabled"}
                                onClick={onClickRemoveWorker}>Remove worker
                        </button>
                        :
                        <button className={!gameContext?.isProcessing ? "btn btn-primary" : "btn btn-primary disabled"}
                                onClick={onClickAddWorker}>Add worker
                        </button>
                    }
                    &nbsp;
                    <button className={!gameContext?.isProcessing ? "btn btn-danger" : "btn btn-danger disabled"}
                            onClick={onClickDelete}>Supprimer
                    </button>
                </div>
            </div>

        </>
    )
}
export default BuildingCard;

