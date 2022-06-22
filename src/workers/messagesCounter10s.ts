let lastMessagesCount: number | undefined;
let lastMessagesCountIn10Seconds: number | undefined;

let messagesCountIn10Seconds = 0;
let iterations = 0;

export function getMessagesCountLast10Seconds(): number | undefined {
    const messagesCount: number = document.getElementsByClassName("chat-line__message").length;
    if (lastMessagesCount === undefined) {
        lastMessagesCount = messagesCount;
        return;
    }

    const messagesCountLastSecond: number = messagesCount - lastMessagesCount;
    lastMessagesCount = messagesCount;
    messagesCountIn10Seconds += messagesCountLastSecond;

    iterations++;

    if (iterations == 10) {
        lastMessagesCountIn10Seconds = messagesCountIn10Seconds;
        messagesCountIn10Seconds = 0;
        iterations = 0;
    }

    return lastMessagesCountIn10Seconds;
}
