import {useAppSelector} from "../../store/storeHooks";
import React, {useEffect} from "react";
import BuildingCard from "./BuildingCard";
import {BuildingTypeEnum} from "./model/BuildingPrototype";
import BuildingPlan from "./BuildingPlanCard";
import BuildingFactory from "./model/BuildingFactory";

const Buildings = () => {

    const buildingList = useAppSelector((state) => state.building);

    const buildingPrototypePlans =
        [BuildingFactory.getInstance().getPrototype(BuildingTypeEnum.LUMBER_CAMP),
            BuildingFactory.getInstance().getPrototype(BuildingTypeEnum.LUMBER_MILL)];

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