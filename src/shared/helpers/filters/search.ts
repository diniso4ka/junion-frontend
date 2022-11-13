export const searchByIncludes = (data, searchValue) => {
    const filtredData = data.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    return filtredData
}
