import { ChatStats } from "../types/chatStats";
import { updateStats } from "../ui/stats";

import { getMessagesCountLastSecond } from "./messagesCounter1s";
import { getMessagesCountLast10Seconds } from "./messagesCounter10s";

export function startWorkers() {
    intervalCallback();
    setInterval(intervalCallback, 1000);
}

function intervalCallback() {
    const stats: ChatStats = {
        messagesPerSecond: getMessagesCountLastSecond(),
        messagesPer10Seconds: getMessagesCountLast10Seconds(),
    };

    updateStats(stats);
}
