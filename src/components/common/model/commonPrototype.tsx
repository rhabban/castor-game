import {v4 as uuidv4} from "uuid";
import cloneDeep from "lodash.clonedeep";


export interface ICommonPrototype {
    id: string;
    name: string;

    clone(): ICommonPrototype;

    getImageSrc(): string;
}

export abstract class ACommonPrototype implements ICommonPrototype {
    id: string;
    name: string;

    protected constructor(name: string) {
        this.id = uuidv4();
        this.name = name;
    }

    static copy(commonPrototype: ACommonPrototype) {
        return cloneDeep(commonPrototype);
    }

    static clone(commonPrototype: ACommonPrototype) {
        let clone = ACommonPrototype.copy(commonPrototype);
        clone.id = uuidv4();
        return clone;
    }


    // NOTE : I return any to avoid cloning method from derived class to clone a CommonPrototype (I need to clone a derived Class)
    public clone(): any {
        return ACommonPrototype.clone(this);
    }

    public getImageSrc(): string {
        return "";
    }

}