import { StateSchema } from 'app/store/config/StateSchema'

export const getRegisterSuperCode = (state: StateSchema) =>
    state?.registerForm?.superCode || ''
