import { ChatStats } from "../../types/chatStats";
import { StatProvider } from "../provider";

export class MessagesCounter extends StatProvider {
    private readonly messagesCountOn3s: number[] = [];
    private readonly messagesCountOn10s: number[] = [];

    private lastMessageCountOn1s: number | undefined;
    private lastMessageCountOn10s: number | undefined;

    private messagesCount = 0;

    public tick(): void {
        this.messagesCountOn3s.push(this.messagesCount);
        this.messagesCountOn10s.push(this.messagesCount);
        this.messagesCount = 0;

        if (this.messagesCountOn3s.length === 3 + 1) {
            this.messagesCountOn3s.shift();
        }

        if (this.messagesCountOn10s.length === 10 + 1) {
            this.messagesCountOn10s.shift();
        }

        this.lastMessageCountOn1s = this.messagesCountOn3s.reduce((acc, x) => acc + x) / 3;
        this.lastMessageCountOn10s = this.messagesCountOn10s.reduce((acc, x) => acc + x);
    }

    public messageReceived(): void {
        this.messagesCount++;
    }

    public fill(stats: ChatStats): void {
        stats.messagesPerSecond = this.lastMessageCountOn1s?.toFixed(1);
        stats.messagesPer10Seconds = this.lastMessageCountOn10s?.toFixed(0);
    }
}
