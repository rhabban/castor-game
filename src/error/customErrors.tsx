import {RessourceTypeEnum} from "../components/ressource/model/RessourcePrototype";

export class RessourceError extends Error {
    ressourceType: RessourceTypeEnum

    constructor(msg: string, ressourceType: RessourceTypeEnum) {
        super(msg);
        this.ressourceType = ressourceType;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RessourceError.prototype);
    }
}

export class WorkerError extends Error {
    constructor(msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, WorkerError.prototype);
    }
}

export class PrototypeError extends Error {

    constructor(msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, PrototypeError.prototype);
    }
}
