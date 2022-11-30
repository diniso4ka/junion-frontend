import { USER_LOCALSTORAGE_TOKEN } from '../../consts/localStorage'

export const saveTokenInLocalStorage = async token => {
    await localStorage.setItem(USER_LOCALSTORAGE_TOKEN, token)
}
