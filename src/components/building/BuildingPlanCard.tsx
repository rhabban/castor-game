import React, {useContext} from "react";
import {BuildingPrototype} from "./model/BuildingPrototype";
import {FaClock, FaHammer} from "react-icons/fa";
import BuildingFactory from "./model/BuildingFactory";
import {useAppDispatch} from "../../store/storeHooks";
import {addGameEvent} from "../gameEvent/gameEventSlice";
import {GameEventEntity} from "../gameEvent/GameEventEntity";
import GameContext from "../../context/GameContext";
import {decrementRessource} from "../ressource/ressourcesSlice";
import {RessourceError} from "../../error/customErrors";
import {fireRessourceError, fireValidNotification} from "../../helpers/swalHelpers";
import {addBuilding, addWorkerToBuilding, setIsEnabled} from "./buildingSlice";
import {Worker} from "../worker/Workers";
import {addBuildingToWorker} from "../worker/workersSlice";

const BuildingPlanCard = ({buildingPlan}: { buildingPlan: BuildingPrototype }) => {
    const dispatch = useAppDispatch();

    const gameContext = useContext(GameContext);


    const onClickBuild = (worker: Worker) => {
        const buildingPrototype = BuildingFactory.getInstance().getPrototype(buildingPlan.type);

        createBuilding(buildingPrototype.clone(), worker);
    }

    const createBuilding = (buildingPrototype: BuildingPrototype, worker: Worker) => {
        (async () => {
            dispatch(decrementRessource({
                ressourceType: buildingPrototype.cost.type,
                quantity: buildingPrototype.cost.quantity
            }))
        })().then(() => {
            fireValidNotification(buildingPrototype.name + " has been successfuly built");
            dispatch(addBuilding(buildingPrototype))
            dispatch(setIsEnabled({buildingId: buildingPrototype.id, value: true}))
            dispatch(addWorkerToBuilding({workerId: worker.id, buildingId: buildingPrototype.id}))
            dispatch(addBuildingToWorker({workerId: worker.id, buildingId: buildingPrototype.id}))
            dispatch(addGameEvent(new GameEventEntity(buildingPrototype.name + " has been built", "building", gameContext?.turn || 0)))
        }).catch((e: RessourceError) => {
            dispatch(addGameEvent(
                new GameEventEntity("Manque de " + e.ressourceType + " pour construire le bâtiment : " + buildingPrototype.name, "ressources", gameContext?.turn || 0)))
            fireRessourceError(e.message);
        }).catch((e) => {
            dispatch(addGameEvent(new GameEventEntity("Manque de " + e.ressourceType + " pour construire le bâtiment : " + buildingPrototype.name, "ressources", gameContext?.turn || 0)))
        })
    }

    return (
        <>
            <div className={"card mb-2 planCard col-11 " + buildingPlan.className + "Plan"}>
                <div className="row">
                    <div className="col-3 g-0">
                        <img
                            src={process.env.PUBLIC_URL + buildingPlan.getImageSrc()}
                            className={"card-img"} style={{width: "auto", height: "160px"}} alt="..."/>
                    </div>
                    <div className="col-9">
                        <div className="card-body">
                            <h5 className="card-title">{buildingPlan.name}</h5>
                            <div className={"row"}>
                                <p className="col-3 card-text text-end">
                                    Building cost

                                    <br/>
                                    <small>{buildingPlan.cost.quantity} {buildingPlan.cost.type}</small>
                                    <br/>
                                    <small>X turn </small><FaClock/>
                                </p>
                                <p className="col-4 card-text text-muted text-end">
                                    Production by turn
                                    <br/>
                                    <small>
                                        + {buildingPlan.quantityOut} {buildingPlan.ressourceTypeOut}
                                    </small>
                                    <br/>
                                    <small>
                                        - {buildingPlan.quantityIn} {buildingPlan.ressourceTypeIn}
                                    </small>
                                </p>
                                <div className={"col-5"}>
                                    <div className="dropdown">
                                        <button
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            data-bs-toggle="dropdown"
                                            className={"btn btn-sm btn-primary dropdown-toggle"} id="affectWorker"
                                        >Build <FaHammer/>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="affectWorker">
                                            {
                                                gameContext?.availableWorkers?.map((worker) => (
                                                    <li key={worker.id}>
                                                        <button className="dropdown-item"
                                                                onClick={() => onClickBuild(worker)}>{worker.name}</button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BuildingPlanCard;

