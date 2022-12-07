export const searchByIncludes = (data, searchValue) => {
    const convertedData = data.map(item => ({
        ...item,
        searchData: `${item.vendor}-${item.art} ${item.category.join(' ')} ${
            item.name
        } ${item.price} ${item.quantity} ${item.unit} ${item.owner}
        `,
    }))
    const filtredData = convertedData.filter(item =>
        item.searchData.toLowerCase().includes(searchValue.toLowerCase())
    )
    return filtredData
}
