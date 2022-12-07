import { StateSchema } from 'app/store/config/StateSchema'

export const getSortedProductsList = (state: StateSchema) =>
    state.products.sortedItems
