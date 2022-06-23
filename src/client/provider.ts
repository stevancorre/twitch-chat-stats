import { ChatStats } from "../types/chatStats";

//export interface StatProvider {
//    start: () => void;
//    messageReceived: () => void;
//    fill: (stats: ChatStats) => void;
//}

export abstract class StatProvider {
    abstract tick(): void;
    abstract messageReceived(): void;
    abstract fill(stats: ChatStats): void;
}
