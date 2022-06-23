import { Client } from "tmi.js";

import { instantiate } from "../helpers/typeHelper";
import { ChatStats } from "../types/chatStats";
import { updateStats } from "../ui/stats";

import { StatProvider } from "./provider";
import { providers } from "./providers";

let clientProviders: StatProvider[];
let tmi: Client | undefined;
let timer: NodeJS.Timer | undefined;

let oldHref: string = document.location.href;
export function startClientListening() {
    const bodyList = document.querySelector("body")!;

    const observer: MutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(() => {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;

                stopClient();
                startClient();
            }
        });
    });

    const config: MutationObserverInit = {
        childList: true,
        subtree: true,
    };

    observer.observe(bodyList, config);
}

export function startClient() {
    if (tmi !== undefined) throw "Attempting to start an already started client";

    console.log("new instance started");

    const username: string = window.location.href
        .replace(/https?:\/\/.*twitch.*\/(.*)/g, "$1")
        .trim();
    if (username === "") return;

    clientProviders = providers.map((x) => instantiate(x));

    tmi = new Client({
        connection: {
            secure: true,
            reconnect: true,
        },
        channels: [username],
    });

    tmi.connect();

    tmi.on("message", () => {
        for (const provider of clientProviders) {
            provider.messageReceived();
        }
    });

    timer = setInterval(() => {
        for (const provider of clientProviders) {
            provider.tick();
        }

        updateStats(getClientStats());
    }, 1000);
}

export function stopClient() {
    tmi?.disconnect();
    tmi = undefined;

    clearInterval(timer);
}

export function getClientStats(): ChatStats {
    const stats: ChatStats = {} as ChatStats;

    for (const provider of clientProviders) {
        provider.fill(stats);
    }

    return stats;
}
