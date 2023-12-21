import {v4 as uuidv4} from "uuid";
import {RessourceTypeEnum} from "../Ressource";
import {useAppSelector} from "../../store/Hooks";


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
    const ressourceRecord = useAppSelector((state) => state.ressource);

    console.log("Missions render", missionList)

    return (
        <>
            <h3>Mes missions</h3>
            {
                missionList.map((mission: IMission) => (
                    <MissionCheck mission={mission} ressourceRecord={ressourceRecord}/>
                ))
            }
        </>
    )
}

const MissionCheck = ({mission, ressourceRecord}: {
    mission: IMission,
    ressourceRecord: Record<RessourceTypeEnum, number>
}) => {

    console.log("MissionCheck render")

    return (
        <div className="form-check form-switch">
            {
                mission.isCompleted ?
                    <>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                               checked
                               disabled/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                            {mission.name}</label>
                    </>
                    :
                    <>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                               disabled/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{opacity: 1}}>
                            {mission.name}</label>
                    </>
            }
        </div>
    )
}
export default Missions;