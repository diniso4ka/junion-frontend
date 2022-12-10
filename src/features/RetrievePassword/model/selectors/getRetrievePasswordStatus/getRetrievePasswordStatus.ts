import { StateSchema } from 'app/store/config/StateSchema'

export const getRetrievePasswordStatus = (state: StateSchema) =>
    state?.retrievePassword?.isLoading
