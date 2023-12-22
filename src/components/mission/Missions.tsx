import {v4 as uuidv4} from "uuid";
import {RessourceTypeEnum} from "../Ressource";
import {useAppSelector} from "../../store/Hooks";
import {useEffect} from "react";


export interface IMission {
    id: string;
    name: string;
    isCompleted: boolean;

    validate: Function;
}

export abstract class Mission implements IMission {
    id: string;
    name: string;
    isCompleted: boolean;

    constructor(name: string) {
        this.id = uuidv4();

        this.name = name;
        this.isCompleted = false;
    }

    validate = (payload: any) => {
    }
}

export class StockMission extends Mission {

    targetResource: RessourceTypeEnum;
    targetStock: number;

    constructor(name: string, targetResource: RessourceTypeEnum, targetStock: number) {
        super(name);
        this.targetResource = targetResource
        this.targetStock = targetStock
    }

    validate = (payload: Record<RessourceTypeEnum, number>) => {
        return payload[this.targetResource] >= this.targetStock
    }
}

const Missions = () => {

    const missionList = useAppSelector((state) => state.mission);

    console.log("Missions render", missionList)

    useEffect(() => {
        console.log("missionList", missionList)

    }, [missionList]);

    return (
        <>
            <h3>Mes missions</h3>
            {
                missionList?.map((mission: IMission) => (
                    <MissionCheck key={mission.id} mission={mission}/>
                ))
            }
        </>
    )
}

const MissionCheck = ({mission}: {
    mission: IMission,
}) => {


    console.log("MissionCheck render")

    useEffect(() => {
        console.log("mission", mission)
    }, [mission]);

    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch"
                   checked={mission.isCompleted}
                   disabled={true}/>
            <label className="form-check-label" style={{opacity: (mission.isCompleted ? 0.5 : 1)}}>
                {mission.name} completed</label>
        </div>
    )
}
export default Missions;