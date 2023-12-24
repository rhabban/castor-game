import {useAppDispatch, useAppSelector} from "../../store/storeHooks";
import React, {useEffect} from "react";
import BuildingCard from "./BuildingCard";

const Buildings = () => {

    const buildingList = useAppSelector((state) => state.building);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("buildingList updated", buildingList)
    }, [buildingList]);

    console.log("Buildings render")
    return (
        <>
            <h3>Buildings</h3>
            <div className="row">
                {
                    buildingList.map((build) => (
                        <BuildingCard key={build.id} building={build}/>
                    ))
                }
            </div>
            <h3>Constuire un batiment</h3>
            <button onClick={() => dispatch({
                type: "building/addBuilding",
                payload: true
            })}> Nouvelle forêt
            </button>

        </>
    )
}
export default Buildings;