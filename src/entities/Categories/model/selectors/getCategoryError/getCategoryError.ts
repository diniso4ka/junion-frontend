import { StateSchema } from 'app/store/config/StateSchema'

export const getCategoryError = (state: StateSchema) => state?.categories?.error
