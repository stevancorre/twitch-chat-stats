import { ChatStats } from "../../types/chatStats";
import { StatProvider } from "../provider";

const PERIOD_1S = 3;
const PERIOD_10S = 10;

let messagesCount = 0;

const messagesCountOn3s: number[] = [];
const messagesCountOn10s: number[] = [];

let lastMessageCountOn1s: number | undefined;
let lastMessageCountOn10s: number | undefined;

export const messagesCounter: StatProvider = {
    start(): void {
        setInterval(() => {
            messagesCountOn3s.push(messagesCount);
            messagesCountOn10s.push(messagesCount);
            messagesCount = 0;

            if (messagesCountOn3s.length === PERIOD_1S + 1) {
                messagesCountOn3s.shift();
            }

            if (messagesCountOn10s.length === PERIOD_10S + 1) {
                messagesCountOn10s.shift();
            }

            lastMessageCountOn1s = messagesCountOn3s.reduce((acc, x) => acc + x) / PERIOD_1S;
            lastMessageCountOn10s = messagesCountOn10s.reduce((acc, x) => acc + x);
        }, 1000);
    },
    messageReceived(): void {
        messagesCount++;
    },
    fill(stats: ChatStats): void {
        stats.messagesPerSecond = lastMessageCountOn1s?.toFixed(1);
        stats.messagesPer10Seconds = lastMessageCountOn10s?.toFixed(0);
    },
};
