export function formattedDate() {
    const date = new Date()
    const correctDay = date.getDate()
    const correctMonth = +new Date().getMonth() + 1
    const day =
        correctDay.toString().length === 1 ? `0${correctDay}` : correctDay
    const month =
        correctMonth.toString().length === 1 ? `0${correctMonth}` : correctMonth
    const formattedDate = `${date.toString().split(' ')[3]}-${month}-${day}`
    return formattedDate
}
