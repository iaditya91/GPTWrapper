export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function isObjectNotEmpty(obj) {
    return !Object.keys(obj).length === 0;
}