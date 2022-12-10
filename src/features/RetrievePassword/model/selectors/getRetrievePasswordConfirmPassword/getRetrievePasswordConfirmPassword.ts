import { StateSchema } from 'app/store/config/StateSchema'

export const getRetrievePasswordConfirmPassword = (state: StateSchema) =>
    state?.retrievePassword?.form?.confirmPassword || ''
