import { StateSchema } from 'app/store/config/StateSchema'

export const getProductsError = (state: StateSchema) => state?.products?.error
