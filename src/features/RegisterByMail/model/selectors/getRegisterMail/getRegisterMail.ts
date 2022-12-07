import { StateSchema } from 'app/store/config/StateSchema'

export const getRegisterMail = (state: StateSchema) =>
    state?.registerForm?.mail || ''
