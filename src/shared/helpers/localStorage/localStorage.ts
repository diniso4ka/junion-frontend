import { USER_LOCALSTORAGE_TOKEN } from '../../config/consts/localStorage'

export const saveTokenInLocalStorage = async token => {
    await localStorage.setItem(USER_LOCALSTORAGE_TOKEN, token)
}
