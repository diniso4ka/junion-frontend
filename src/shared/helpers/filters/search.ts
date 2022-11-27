export const searchByIncludes = (data, searchValue) => {
    const convertedData = data.map(item => ({
        ...item,
        searchData: `${item.name} ${item.art} ${item.owner} ${
            item.vendor
        } ${item.category.join(' ')}`,
    }))
    const filtredData = convertedData.filter(item =>
        item.searchData.toLowerCase().includes(searchValue.toLowerCase())
    )
    return filtredData
}
