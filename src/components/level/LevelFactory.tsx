import LevelPrototype from "./LevelPrototype";
import {BuildingTypeEnum} from "../building/model/BuildingPrototype";
import {PrototypeError} from "../../error/customErrors";
import {StockMission} from "../mission/Missions";
import {RessourceTypeEnum} from "../ressource/model/RessourcePrototype";

export class LevelFactory {
    private static instance: LevelFactory;

    private levelPrototypeMap: Map<number, LevelPrototype> = new Map<number, LevelPrototype>();

    public constructor() {
        this.levelPrototypeMap.set(0, new LevelPrototype(0, "Welcome to castor game !\n" +
            " Your first mission is to collect some wood with your first camp",
            [new StockMission("Collect 10 wood", RessourceTypeEnum.WOOD, 10)],
            []));
        this.levelPrototypeMap.set(1, new LevelPrototype(1, "Fine, you know now how to collect" +
            " a ressource from a building.\n For your next mission, you have to produce some plank from a new building",
            [new StockMission("Collect 2 plank", RessourceTypeEnum.PLANK, 2)], [BuildingTypeEnum.LUMBER_MILL]));
    }

    public static getInstance(): LevelFactory {
        if (!LevelFactory.instance)
            LevelFactory.instance = new LevelFactory();
        return LevelFactory.instance;
    }

    public getLevel(number: number | undefined): LevelPrototype {
        if (number === undefined)
            throw new PrototypeError("Level Number is not known when calling getLevel from levelFactory")
        if (this.levelPrototypeMap.has(number))
            return this.levelPrototypeMap.get(number) as LevelPrototype;
        else throw new PrototypeError("Level " + number + " isn't defined");
    }

    /*public getPrototype(ressourceType: RessourceTypeEnum): RessourcePrototype {
        if (this.levelPrototypeMap.has(ressourceType))
            return this.levelPrototypeMap.get(ressourceType) as RessourcePrototype;
        else throw new PrototypeError("Prototype " + ressourceType + "isn't declared in ressourcePrototypeMap");
    }*/
}

export default LevelFactory;