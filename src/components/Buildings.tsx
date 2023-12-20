import {useAppDispatch, useAppSelector} from "../store/Hooks";
import React from "react";
import BuildingCard from "./BuildingCard";

const Buildings = () => {

    const buildingList = useAppSelector((state) => state.building);

    const dispatch = useAppDispatch();

    console.log("Buildings render")
    return (
        <>
            <h3>Mes batiments</h3>
            <div className="row">
                {
                    buildingList.map((build) => (
                        <BuildingCard building={build}/>
                    ))
                }
            </div>
            <button onClick={() => dispatch({
                type: "building/addBuilding",
                payload: true
            })}> Nouvelle forêt
            </button>

        </>
    )
}
export default Buildings;