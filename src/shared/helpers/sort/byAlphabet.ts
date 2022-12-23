export function sortByAlphabet(a, b) {
    if (!a) {
        return -2
    }
    if (!b) {
        return
    }
    if (a.toLowerCase() < b.toLowerCase()) {
        return -1
    }
    if (a.toLowerCase() > b.toLowerCase()) {
        return 1
    }
    return 0
}
