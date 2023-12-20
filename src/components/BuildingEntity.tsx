import {RessourceTypeEnum} from "./Ressource";
import cloneDeep from "lodash.clonedeep";

import {v4 as uuidv4} from 'uuid';

export class BuildingEntity {
    id: string;
    name: string;

    ressourceTypeOut: RessourceTypeEnum;
    quantityOut: number;

    ressourceTypeIn: RessourceTypeEnum;
    quantityIn: number;

    isEnabled: boolean;

    constructor(name: string, ressourceTypeOut: RessourceTypeEnum, quantityOut: number, ressourceTypeIn: RessourceTypeEnum, quantityIn: number) {
        this.id = uuidv4();
        this.name = name;
        this.ressourceTypeOut = ressourceTypeOut;
        this.quantityOut = quantityOut;
        this.ressourceTypeIn = ressourceTypeIn;
        this.quantityIn = quantityIn;
        this.isEnabled = false;
    }

    static copy(building: BuildingEntity) {
        return cloneDeep(building);
    }

    static clone(building: BuildingEntity) {
        let clone = BuildingEntity.copy(building);
        clone.id = uuidv4();
        return clone;
    }

}