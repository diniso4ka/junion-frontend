import { StateSchema } from 'app/store/config/StateSchema'

export const getLoginState = (state: StateSchema) => state?.loginForm
