import { StateSchema } from 'app/store/types'

export const getProductsQuantity = (state: StateSchema) =>
    state.products.quantity
