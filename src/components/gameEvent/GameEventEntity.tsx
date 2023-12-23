import {v4 as uuidv4} from "uuid";

export class GameEventEntity {
    id: string;
    timestamp: Date;

    message: string;
    type: string;
    turn: number;


    constructor(message: string, type: string, turn: number) {
        this.id = uuidv4();
        this.timestamp = new Date();

        this.type = type;
        this.message = message;
        this.turn = turn;
    }
}
