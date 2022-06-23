import { Client } from "tmi.js";
import { ChatStats } from "../types/chatStats";
import { updateStats } from "../ui/stats";
import { providers } from "./providers";

export function startClient(): void {
    const username: string = window.location.href
        .replace(/https?:\/\/.*twitch.*\/(.*)/g, "$1")
        .trim();
    if (username === "") return;

    for (const provider of providers) {
        provider.start();
    }

    const client: Client = new Client({
        connection: {
            secure: true,
            reconnect: true,
        },
        channels: [username],
    });

    client.connect();

    client.on("message", () => {
        for (const provider of providers) {
            provider.messageReceived();
        }
    });

    setInterval(() => {
        updateStats(getClientStats());
    }, 1000);
}

export function getClientStats(): ChatStats {
    const stats: ChatStats = {} as ChatStats;

    for (const provider of providers) {
        provider.fill(stats);
    }

    return stats;
}
