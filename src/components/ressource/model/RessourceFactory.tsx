import {RessourcePrototype, RessourceTypeEnum} from "./RessourcePrototype";
import {PrototypeError} from "../../../error/customErrors";

export class RessourceFactory {
    private static instance: RessourceFactory;

    private ressourcePrototypeMap: Map<RessourceTypeEnum, RessourcePrototype> = new Map<RessourceTypeEnum, RessourcePrototype>();

    public constructor() {
        this.ressourcePrototypeMap.set(RessourceTypeEnum.WOOD, new RessourcePrototype(RessourceTypeEnum.WOOD, 0));
        this.ressourcePrototypeMap.set(RessourceTypeEnum.PLANK, new RessourcePrototype(RessourceTypeEnum.PLANK, 0));
        this.ressourcePrototypeMap.set(RessourceTypeEnum.STONE, new RessourcePrototype(RessourceTypeEnum.STONE, 0));
    }

    public static getInstance(): RessourceFactory {
        if (!RessourceFactory.instance)
            RessourceFactory.instance = new RessourceFactory();
        return RessourceFactory.instance;
    }

    public getPrototype(ressourceType: RessourceTypeEnum): RessourcePrototype {
        if (this.ressourcePrototypeMap.has(ressourceType))
            return this.ressourcePrototypeMap.get(ressourceType) as RessourcePrototype;
        else throw new PrototypeError("Prototype " + ressourceType + "isn't declared in ressourcePrototypeMap");
    }
}

export default RessourceFactory;