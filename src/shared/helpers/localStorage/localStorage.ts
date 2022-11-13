import { TOKEN_KEY } from '../../config/config/consts'

export const saveTokenInLocalStorage = async payload => {
    const token = await payload
    await localStorage.setItem(TOKEN_KEY, token)
}
