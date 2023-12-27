import {useAppSelector} from "../../store/storeHooks";
import React, {useContext, useEffect, useMemo} from "react";
import BuildingCard from "./BuildingCard";
import BuildingPlan from "./BuildingPlanCard";
import BuildingFactory from "./model/BuildingFactory";
import GameContext from "../../context/GameContext";
import LevelConfig from "../level/LevelConfig";

const Buildings = () => {

    const buildingList = useAppSelector((state) => state.building);

    const gameContext = useContext(GameContext);

    const availableBuilding = useMemo(
        () => LevelConfig.getInstance().getLevel(gameContext?.level).availableBuildings, [gameContext?.level]);


    const buildingPrototypePlans = useMemo(() => {
        return availableBuilding.map((buildingType) => {
            return BuildingFactory.getInstance().getPrototype(buildingType)
        })
    }, [availableBuilding]);

    /*const buildingPrototypePlans = availableBuilding.map((buildingType) => {
        return BuildingFactory.getInstance().getPrototype(buildingType)
    })*/

    useEffect(() => {
        console.log("availableBuilding changed")
    }, [gameContext?.level]);

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
                {
                    buildingPrototypePlans.map((buildingPlan) => (
                        <BuildingPlan key={buildingPlan.name} buildingPlan={buildingPlan}/>
                    ))
                }
            </div>

        </>
    )
}
export default Buildings;