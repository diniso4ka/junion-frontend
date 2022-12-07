import { StateSchema } from 'app/store/config/StateSchema'

export const getRegisterName = (state: StateSchema) =>
    state?.registerForm?.name || ''
