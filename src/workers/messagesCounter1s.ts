let lastMessagesCount: number | undefined;

export function getMessagesCountLastSecond(): number | undefined {
    const messagesCount: number = document.getElementsByClassName("chat-line__message").length;
    if (lastMessagesCount === undefined) {
        lastMessagesCount = messagesCount;
        return;
    }

    const messagesCountLastSecond: number = messagesCount - lastMessagesCount;
    lastMessagesCount = messagesCount;

    return messagesCountLastSecond;
}
