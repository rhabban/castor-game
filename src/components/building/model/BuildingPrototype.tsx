import {RessourceTypeEnum} from "../../ressource/model/RessourcePrototype";
import {v4 as uuidv4} from "uuid";
import cloneDeep from "lodash.clonedeep";

export enum BuildingTypeEnum {
    LUMBER_CAMP = "Lumber Camp", LUMBER_MILL = "Lumber Mill", STONE_QUARRY = "Stone Quarry"
}

export enum BuildingTypeImageSrcEnum {
    "Lumber Camp" = "/images/buildings/Woodcutters_Camp_icon.webp",
    "Lumber Mill" = "/images/buildings/Lumbermill_icon.webp",
    "Stone Quarry" = "/images/buildings/Stonecutters_Camp_icon.webp",
}

export class BuildingPrototype {
    id: string;
    name: string;

    type: BuildingTypeEnum;

    ressourceTypeOut: RessourceTypeEnum;
    quantityOut: number;

    ressourceTypeIn: RessourceTypeEnum;
    quantityIn: number;

    isEnabled: boolean;

    workersId: Array<string>;

    constructor(name: string, type: BuildingTypeEnum, ressourceTypeOut: RessourceTypeEnum, quantityOut: number, ressourceTypeIn: RessourceTypeEnum, quantityIn: number) {
        this.id = uuidv4();
        this.name = name;
        this.type = type;
        this.ressourceTypeOut = ressourceTypeOut;
        this.quantityOut = quantityOut;
        this.ressourceTypeIn = ressourceTypeIn;
        this.quantityIn = quantityIn;
        this.isEnabled = false;
        this.workersId = [];
    }

    static copy(building: BuildingPrototype) {
        return cloneDeep(building);
    }

    static clone(building: BuildingPrototype) {
        let clone = BuildingPrototype.copy(building);
        clone.id = uuidv4();
        return clone;
    }

    public clone(): BuildingPrototype {
        return BuildingPrototype.clone(this);
    }

    public getImageSrc() {
        return BuildingTypeImageSrcEnum[this.type];
    }
}