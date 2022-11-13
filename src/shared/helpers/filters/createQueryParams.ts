export const createQueryParams = data => {
    const ret = []
    for (let d in data) {
        if (data[d]) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
        }
    }
    return ret.join('&').toLowerCase()
}
