import {useAppDispatch, useAppSelector} from "../store/Hooks";
import {BuildingEntity} from "./BuildingEntity";
import {deleteBuilding, toggleActivate} from "../store/BuildingSlice";
import {addEventAction} from "../store/EventActionSlice";
import {EventActionEntity} from "./EventActionEntity";
import Swal from "sweetalert2";
import {editWorker} from "../store/WorkerSlice";
import {useContext} from "react";
import GameContext from "../context/GameContext";
import {IWorker} from "./Workers";

const BuildingCard = ({building}: { building: BuildingEntity }) => {
    const gameContext = useContext(GameContext);

    const workerList = useAppSelector((state) => state.worker);
    const dispatch = useAppDispatch();
    console.log("BuildingCard render;")

    const workersToAvailableWorkerOptions = () => {
        let formattedOptions: { [index: string]: any } = {}
        workerList.forEach(worker => {
            if (!worker.isWorking) {
                formattedOptions[worker.name] = worker.name
            }
        })
        return formattedOptions;
    }

    const onClickToggle = () => {
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
                    console.log(value);
                    workerList.forEach(worker => {
                        if (worker.name === value) {
                            let newWorker: IWorker = {...worker, isWorking: true};
                            dispatch(editWorker(newWorker))
                            dispatch(addEventAction(new EventActionEntity(worker.name + " est affecté à " + building.name, "worker", gameContext?.turn || 0)))
                        }
                    })
                    resolve();
                });
            }
        });
        dispatch(toggleActivate(building))
        dispatch(addEventAction(new EventActionEntity(building.name + " isEnable= " + building.isEnabled, "building", gameContext?.turn || 0)))
    }

    const onClickDelete = () => {
        dispatch(deleteBuilding(building));
        dispatch(addEventAction(new EventActionEntity(building.name + " deleted", "building", gameContext?.turn || 0)))
    }

    return (
        <>
            <div className="card col-3" style={{"padding": "0"}}>
                <img
                    src="https://images-ext-2.discordapp.net/external/10jAPDcW1_3z6EpCoXJCVstGo0H8DXtjPazPzoKYgME/%3Fcb%3D20221105224430/https/static.wikia.nocookie.net/against-the-storm/images/0/0f/Leatherworks_icon.png/revision/latest?format=webp"
                    className={"card-img-top"} alt="..."/>
                <div className="card-body"
                     style={!building.isEnabled ? {color: "gray", backgroundColor: "lightgray"} : {}}>
                    <h5 className="card-title">{building.name} {!building.isEnabled ? <em>ZzZz</em> : <></>}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{building.isEnabled ? <>actif</> : <>inactif</>}</h6>

                    <p className="card-text"> + {building.isEnabled ? building.quantityOut : 0} {building.ressourceTypeOut} /
                        - {building.isEnabled ? building.quantityIn : 0} {building.ressourceTypeIn}</p>

                    <button className={!gameContext?.isProcessing ? "btn btn-primary" : "btn btn-primary disabled"}
                            onClick={onClickToggle}>Activer
                    </button>
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

