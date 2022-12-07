import { StateSchema } from 'app/store/config/StateSchema'

export const getRegisterAsyncErrors = (state: StateSchema) =>
    state?.registerForm?.asyncErrors
