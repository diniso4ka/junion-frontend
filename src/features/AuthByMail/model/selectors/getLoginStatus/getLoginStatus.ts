import { StateSchema } from 'app/store/config/StateSchema'

export const getLoginStatus = (state: StateSchema) =>
    state?.loginForm?.isLoading || false
