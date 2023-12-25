import cloneDeep from "lodash.clonedeep";

export interface RessourceWithQuantity {
    type: RessourceTypeEnum,
    quantity: number
}

export enum RessourceTypeEnum {
    WOOD = "Wood",
    PLANK = "Plank",
    STONE = "Stone"
}

export enum RessourceTypeImageSrcEnum {
    "Wood" = "/images/ressources/Icon_Resource_Wood.webp",
    "Plank" = "/images/ressources/Icon_Resource_Plank.webp",
    "Stone" = "/images/ressources/Icon_Resource_Stone.webp",
}

export class RessourcePrototype {
    type: RessourceTypeEnum;
    quantity: number;

    constructor(type: RessourceTypeEnum, quantity: number) {
        this.type = type;
        this.quantity = quantity
    }

    static copy(building: RessourcePrototype) {
        return cloneDeep(building);
    }

    static clone(building: RessourcePrototype) {
        return RessourcePrototype.copy(building);
    }

    public clone(): RessourcePrototype {
        return RessourcePrototype.clone(this);
    }

    public cloneWithSpecificQuantity(quantity: number): RessourcePrototype {
        let clone = RessourcePrototype.clone(this);
        clone.quantity = quantity;
        return clone;
    }

    public getImageSrc() {
        return RessourceTypeImageSrcEnum[this.type];
    }
}

export default RessourcePrototype;