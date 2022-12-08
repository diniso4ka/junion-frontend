export function formattedDate() {
    const date = new Date()
    const day =
        (date.getDate() - 1).toString().length === 1
            ? `0${date.getDate()}`
            : date.getDate()
    const month = +new Date().getMonth() + 1
    const formattedDate = `${date.toString().split(' ')[3]}-${month}-${day}`
    return formattedDate
}
