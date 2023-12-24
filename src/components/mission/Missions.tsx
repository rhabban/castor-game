import {v4 as uuidv4} from "uuid";
import {RessourcePrototype, RessourceTypeEnum} from "../ressource/model/RessourcePrototype";
import {useAppSelector} from "../../store/storeHooks";


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

    targetRessource: RessourceTypeEnum;
    targetStock: number;

    constructor(name: string, targetResource: RessourceTypeEnum, targetStock: number) {
        super(name);
        this.targetRessource = targetResource
        this.targetStock = targetStock
    }

    validate = (payload: RessourcePrototype[]) => {
        const expectedRessource = payload.find(ressource => ressource.type === this.targetRessource)
        return expectedRessource
            && expectedRessource.quantity >= this.targetStock;

    }
}

const Missions = () => {

    const missions = useAppSelector((state) => state.missions);

    console.log("Missions render")

    return (
        <>
            <h3>Missions</h3>
            {
                missions?.map((mission: IMission) => (
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

    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch"
                   checked={mission.isCompleted}
                   disabled={true}/>
            <label className="form-check-label" style={{opacity: (mission.isCompleted ? 0.5 : 1)}}>
                {mission.name}</label>
        </div>
    )
}
export default Missions;