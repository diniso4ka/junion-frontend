export const saveTokenInLocalStorage = async payload => {
    const token = await payload
    await localStorage.setItem('token', token)
}
