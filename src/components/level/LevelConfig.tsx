import LevelPrototype from "./LevelPrototype";
import {BuildingTypeEnum} from "../building/model/BuildingPrototype";
import {LevelError, PrototypeError} from "../../error/customErrors";
import {ActiveBuildingMission, StockMission} from "../mission/Missions";
import {RessourceTypeEnum} from "../ressource/model/RessourcePrototype";

export class LevelConfig {
    private static instance: LevelConfig;

    private levelPrototypeMap: Map<number, LevelPrototype> = new Map<number, LevelPrototype>();

    public constructor() {
        this.levelPrototypeMap.set(0, new LevelPrototype(0, "Welcome to castor game !\n" +
            " Your first mission is to affect a worker to your Lumber camp, you could then extract some wood",
            [new ActiveBuildingMission("Affect a worker to your Lumber Camp", BuildingTypeEnum.LUMBER_CAMP)],
            [],
            ".lumberCamp"));
        this.levelPrototypeMap.set(1, new LevelPrototype(0, "Good job !\n" +
            " Now you can cut some wood with this affected worker",
            [new StockMission("Collect 20 wood", RessourceTypeEnum.WOOD, 20)],
            [],
            ".ressources"));
        this.levelPrototypeMap.set(2, new LevelPrototype(1, "Fine, you know now how to collect" +
            " a ressource from a building.\n For your next mission, you have to produce some plank from a new building",
            [new StockMission("Collect 2 planks", RessourceTypeEnum.PLANK, 2)],
            [BuildingTypeEnum.LUMBER_MILL],
            ".lumberMillPlan"));
        this.levelPrototypeMap.set(3, new LevelPrototype(1, "Ok you got planks now \n" +
            "You can now build a Quarry to extract some stone and then build something more consistant",
            [new StockMission("Collect 2 stones", RessourceTypeEnum.STONE, 2)], [BuildingTypeEnum.LUMBER_MILL, BuildingTypeEnum.STONE_QUARRY],
            ".stoneQuarryPlan"));
    }

    public static getInstance(): LevelConfig {
        if (!LevelConfig.instance)
            LevelConfig.instance = new LevelConfig();
        return LevelConfig.instance;
    }

    public getMaxlevel(): number {
        return this.levelPrototypeMap.size - 1;
    }

    public getLevel(number: number | undefined): LevelPrototype {
        if (number === undefined)
            throw new PrototypeError("Level Number is not known when calling getLevel from levelFactory")
        if (this.levelPrototypeMap.has(number))
            return this.levelPrototypeMap.get(number) as LevelPrototype;
        else throw new LevelError("Level " + number + " isn't defined");
    }

    /*public getPrototype(ressourceType: RessourceTypeEnum): RessourcePrototype {
        if (this.levelPrototypeMap.has(ressourceType))
            return this.levelPrototypeMap.get(ressourceType) as RessourcePrototype;
        else throw new PrototypeError("Prototype " + ressourceType + "isn't declared in ressourcePrototypeMap");
    }*/
}

export default LevelConfig;