import { StateSchema } from 'app/store/config/StateSchema'

export const getLoginError = (state: StateSchema) => state?.loginForm?.error
