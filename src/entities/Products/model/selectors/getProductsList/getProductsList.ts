import { StateSchema } from 'app/store/types'

export const getProductsList = (state: StateSchema) => state.products.items
