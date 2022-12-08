export function discountConvertInNumber(price, discountPercent) {
    const result = +price - (+price / 100) * +discountPercent
    return result
}
export function discountConvertInPercent(price, discountPrice = 0) {
    const result = 100 - (+discountPrice * 100) / +price
    return result
}
