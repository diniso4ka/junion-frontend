import { StateSchema } from 'app/store/config/StateSchema'

export const getRetrievePasswordPassword = (state: StateSchema) =>
    state?.retrievePassword?.form?.password || ''
