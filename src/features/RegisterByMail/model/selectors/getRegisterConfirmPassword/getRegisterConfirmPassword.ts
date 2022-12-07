import { StateSchema } from 'app/store/config/StateSchema'

export const getRegisterConfirmPassword = (state: StateSchema) =>
    state?.registerForm?.confirmPassword || ''
