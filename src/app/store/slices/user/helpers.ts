export const saveTokenInLocalStorage = action => {
    localStorage.setItem(
        'token',
        JSON.stringify(action.payload.data.data.token)
    )
}
