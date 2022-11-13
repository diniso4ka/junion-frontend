export const createQueryParams = data => {
    const ret = []
    for (let d in data) {
        if (data[d]) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
        }
    }
    return ret.join('&').toLowerCase()
}

export const convertQueryParamsInObj = params => {
    const queryParams = {}
    return params.search
        .replace('?', '')
        .split('&')
        .map(item => item.split('='))
        .map(arr => (queryParams[arr[0]] = arr[1]))
}
