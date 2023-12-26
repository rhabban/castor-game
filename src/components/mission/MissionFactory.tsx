import {IMission} from "./Missions";

export class MissionFactory {
    private static instance: MissionFactory;

    private missionMap: Map<number, IMission> = new Map<number, IMission>();

}

export default MissionFactory;