let lastMessagesCount: number | undefined;
let lastReturnValue: number | undefined;

export function getMessagesCountLastSecond(): number | undefined {
    const messagesCount: number = document.getElementsByClassName("chat-line__message").length;
    if (lastMessagesCount === undefined) {
        lastMessagesCount = messagesCount;
        return;
    }

    lastReturnValue = messagesCount - lastMessagesCount;
    lastMessagesCount = messagesCount;

    return peekMessagesCountLastSecond();
}

export function peekMessagesCountLastSecond(): number | undefined {
    return lastReturnValue;
}
