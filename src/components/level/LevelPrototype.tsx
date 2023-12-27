import cloneDeep from "lodash.clonedeep";
import {BuildingTypeEnum} from "../building/model/BuildingPrototype";
import {IMission} from "../mission/Missions";

class LevelPrototype {
    //id: string;
    number: number;
    description: string;
    missions: IMission[];
    availableBuildings: BuildingTypeEnum[];

    selectorElementToHighlight: string | null;

    constructor(number: number, description: string, missions: IMission[], availableBuildings: BuildingTypeEnum[], selectorElementToHighlight: string | null) {
        this.number = number;
        this.description = description;
        this.missions = missions;
        this.availableBuildings = availableBuildings;
        this.selectorElementToHighlight = selectorElementToHighlight;
    }

    static copy(level: LevelPrototype) {
        return cloneDeep(level);
    }

    static clone(level: LevelPrototype) {
        return LevelPrototype.copy(level);
    }

    public clone(): LevelPrototype {
        return LevelPrototype.clone(this);
    }
}

export default LevelPrototype;