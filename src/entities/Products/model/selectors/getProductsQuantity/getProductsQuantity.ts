import { StateSchema } from 'app/store/config/StateSchema'

export const getProductsQuantity = (state: StateSchema) =>
    state.products.quantity
