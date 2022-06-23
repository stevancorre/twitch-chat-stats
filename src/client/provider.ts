import { ChatStats } from "../types/chatStats";

export interface StatProvider {
    start: () => void;
    messageReceived: () => void;
    fill: (stats: ChatStats) => void;
}
