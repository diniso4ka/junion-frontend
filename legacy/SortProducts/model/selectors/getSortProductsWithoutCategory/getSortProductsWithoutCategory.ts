import { StateSchema } from 'app/store/config/StateSchema'

export const getSortProductsWithoutCategory = (state: StateSchema) =>
    state?.sortProducts?.withoutCategory
