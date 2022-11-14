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
    if (params.includes('&')) {
        return params
            .split('&')
            .map(item => item.split('='))
            .map(arr => (queryParams[arr[0]] = arr[1]))
    } else {
        console.log(params)
        return params.split('=').map(arr => (queryParams[arr[0]] = arr[1]))
    }
}
