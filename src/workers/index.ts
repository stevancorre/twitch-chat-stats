import { ChatStats } from "../types/chatStats";
import { updateStats } from "../ui/stats";

import { getMessagesCountLastSecond, peekMessagesCountLastSecond } from "./messagesCounter1s";
import {
    getMessagesCountLast10Seconds,
    peekMessagesCountLast10Seconds,
} from "./messagesCounter10s";

export function startWorkers() {
    intervalCallback();
    setInterval(intervalCallback, 1000);
}

export function peekWorkerStats(): ChatStats {
    return {
        messagesPerSecond: peekMessagesCountLastSecond(),
        messagesPer10Seconds: peekMessagesCountLast10Seconds(),
    };
}

function intervalCallback() {
    const stats: ChatStats = {
        messagesPerSecond: getMessagesCountLastSecond(),
        messagesPer10Seconds: getMessagesCountLast10Seconds(),
    };

    updateStats(stats);
}
