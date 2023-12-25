import {RessourcePrototype, RessourceTypeEnum} from "../../ressource/model/RessourcePrototype";
import {ACommonPrototype} from "../../common/model/commonPrototype";

export enum BuildingTypeEnum {
    LUMBER_CAMP = "Lumber Camp", LUMBER_MILL = "Lumber Mill", STONE_QUARRY = "Stone Quarry"
}

export enum BuildingTypeImageSrcEnum {
    "Lumber Camp" = "/images/buildings/Woodcutters_Camp_icon.webp",
    "Lumber Mill" = "/images/buildings/Lumbermill_icon.webp",
    "Stone Quarry" = "/images/buildings/Stonecutters_Camp_icon.webp",
}

export class BuildingPrototype extends ACommonPrototype {

    type: BuildingTypeEnum;

    ressourceTypeOut: RessourceTypeEnum;
    quantityOut: number;

    ressourceTypeIn: RessourceTypeEnum;
    quantityIn: number;

    cost: RessourcePrototype;


    isEnabled: boolean;

    workersId: Array<string>;

    constructor(name: string, type: BuildingTypeEnum, ressourceTypeOut: RessourceTypeEnum, quantityOut: number, ressourceTypeIn: RessourceTypeEnum, quantityIn: number, cost: RessourcePrototype) {
        super(name);

        this.type = type;
        this.ressourceTypeOut = ressourceTypeOut;
        this.quantityOut = quantityOut;
        this.ressourceTypeIn = ressourceTypeIn;
        this.quantityIn = quantityIn;
        this.isEnabled = false;
        this.workersId = [];
        this.cost = cost;
    }

    public getImageSrc() {
        return BuildingTypeImageSrcEnum[this.type];
    }
}