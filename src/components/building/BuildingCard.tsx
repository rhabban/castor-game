import {useAppSelector} from "../../store/storeHooks";
import React from "react";
import BuildingCardActions from "./BuildingCardActions";
import {BuildingPrototype} from "./model/BuildingPrototype";

const BuildingCard = ({building}: { building: BuildingPrototype }) => {

    const workerList = useAppSelector((state) => state.workers);

    const calculateWorkerName = (workerId: string) => {
        const selectedWorker = workerList.find((worker) => (worker.id === workerId));
        return selectedWorker?.name;
    }

    return (
        <>
            <div className={"card col-3 " + building.className} style={{"padding": "0"}}>
                <img
                    src={process.env.PUBLIC_URL + building.getImageSrc()}
                    className={"card-img-top"} alt="..."/>
                <div className="card-body"
                     style={!building.isEnabled ? {color: "gray", backgroundColor: "lightgray"} : {}}>
                    <h5 className="card-title">{building.name} {!building.isEnabled ? <em>ZzZz</em> : <></>}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">+ {building.isEnabled ? building.quantityOut : 0} {building.ressourceTypeOut}
                        <br/>
                        {building.quantityIn !== 0 ? <> - {building.isEnabled ? building.quantityIn : 0} {building.ressourceTypeIn}</> : <></>}
                    </h6>
                    <div>
                        <p
                            className="card-text"></p>
                        <p>Worker :&nbsp;
                            {
                                building.workersId.map((workerId) => (
                                    calculateWorkerName(workerId)
                                )).join(',')
                            }</p>
                    </div>

                    <BuildingCardActions building={building}/>
                </div>
            </div>

        </>
    )
}
export default BuildingCard;

