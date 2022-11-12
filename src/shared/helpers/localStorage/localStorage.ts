export const saveTokenInLocalStorage = async payload => {
    const token = await payload
    await localStorage.setItem('token', JSON.stringify(token.data.token))
}
