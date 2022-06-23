export function instantiate<T>(constructor: new () => T): T {
    return new constructor();
}
