import {RessourceTypeEnum} from "../components/ressource/Ressource";

export class RessourceError extends Error {
    ressourceType: RessourceTypeEnum
    
    constructor(msg: string, ressourceType: RessourceTypeEnum) {
        super(msg);
        this.ressourceType = ressourceType;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RessourceError.prototype);
    }
}
