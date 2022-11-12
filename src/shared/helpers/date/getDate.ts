export const getDate = () => {
    const date = String(new Date())
    const filtedDate = date.split(' ').splice(1, 3)
    return {
        mounth: filtedDate[0],
        number: filtedDate[1],
        year: filtedDate[2],
    }
}
