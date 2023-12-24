import {useAppDispatch, useAppSelector} from "../../store/storeHooks";
import React, {useEffect} from "react";
import BuildingCard from "./BuildingCard";
import {addBuilding} from "./buildingSlice";
import {BuildingTypeEnum} from "./model/BuildingPrototype";

const Buildings = () => {

    const buildingList = useAppSelector((state) => state.building);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("buildingList updated", buildingList)
    }, [buildingList]);

    console.log("Buildings render")
    return (
        <>
            <div className={"row"}>
                <h3>Buildings</h3>
                <div className="row">
                    {
                        buildingList.map((build) => (
                            <BuildingCard key={build.id} building={build}/>
                        ))
                    }
                </div>
            </div>
            <hr/>
            <div className={"row"}>
                <h3>Constuire un batiment</h3>
                <button onClick={() => dispatch(addBuilding(BuildingTypeEnum.LUMBER_CAMP))}> Nouveau Camp de bucheron
                </button>
            </div>

        </>
    )
}
export default Buildings;