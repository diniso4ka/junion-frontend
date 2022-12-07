import { StateSchema } from 'app/store/config/StateSchema'

export const getProductsList = (state: StateSchema) => state.products.items
