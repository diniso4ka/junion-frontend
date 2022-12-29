import { StateSchema } from 'app/store/config/StateSchema'

export const getVendorsError = (state: StateSchema) => state?.vendors?.error
