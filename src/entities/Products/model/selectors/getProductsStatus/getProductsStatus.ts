import { StateSchema } from 'app/store/types'

export const getProductsStatus = (state: StateSchema) =>
    state.products.isLoading
