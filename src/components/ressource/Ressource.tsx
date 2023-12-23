export enum RessourceTypeEnum {
    BOIS = "Bois",
    PLANCHE = "Planche",
    PIERRE = "Pierre"
}

export type RessourceType = {
    type: RessourceTypeEnum;
    quantity: number;
}

export default RessourceType;