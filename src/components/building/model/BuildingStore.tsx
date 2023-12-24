import {RessourceTypeEnum} from "../../ressource/model/RessourcePrototype";
import {PrototypeError} from "../../../error/customErrors";
import {BuildingPrototype, BuildingTypeEnum} from "./BuildingPrototype";

export class BuildingStore {
    private static instance: BuildingStore;

    private buildingPrototypeMap: Map<BuildingTypeEnum, BuildingPrototype> = new Map<BuildingTypeEnum, BuildingPrototype>();

    public constructor() {
        this.buildingPrototypeMap.set(BuildingTypeEnum.LUMBER_CAMP, new BuildingPrototype(BuildingTypeEnum.LUMBER_CAMP.toString(), BuildingTypeEnum.LUMBER_CAMP,
            RessourceTypeEnum.WOOD, 5, RessourceTypeEnum.WOOD, 0));
        this.buildingPrototypeMap.set(BuildingTypeEnum.LUMBER_MILL, new BuildingPrototype(BuildingTypeEnum.LUMBER_MILL.toString(), BuildingTypeEnum.LUMBER_MILL,
            RessourceTypeEnum.PLANK, 1, RessourceTypeEnum.WOOD, 5));
        this.buildingPrototypeMap.set(BuildingTypeEnum.STONE_QUARRY, new BuildingPrototype(BuildingTypeEnum.STONE_QUARRY.toString(), BuildingTypeEnum.STONE_QUARRY,
            RessourceTypeEnum.STONE, 1, RessourceTypeEnum.STONE, 0));
    }

    public static getInstance(): BuildingStore {
        if (!BuildingStore.instance)
            BuildingStore.instance = new BuildingStore();
        return BuildingStore.instance;
    }

    public getPrototype(buildingType: BuildingTypeEnum): BuildingPrototype {
        if (this.buildingPrototypeMap.has(buildingType))
            return this.buildingPrototypeMap.get(buildingType) as BuildingPrototype;
        else throw new PrototypeError("Prototype " + buildingType + "isn't declared in buildingPrototypeMap");
    }
}

export default BuildingStore;