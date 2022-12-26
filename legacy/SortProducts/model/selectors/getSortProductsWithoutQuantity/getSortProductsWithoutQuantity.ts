import { StateSchema } from 'app/store/config/StateSchema'

export const getSortProductsWithoutQuantity = (state: StateSchema) =>
    state?.sortProducts?.withoutQuantity
