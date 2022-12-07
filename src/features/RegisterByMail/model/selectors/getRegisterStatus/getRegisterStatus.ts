import { StateSchema } from 'app/store/config/StateSchema'

export const getRegisterStatus = (state: StateSchema) =>
    state?.registerForm?.isLoading
