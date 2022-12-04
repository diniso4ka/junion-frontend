import { StateSchema } from 'app/store/types'

export const getSortedProductsList = (state: StateSchema) =>
    state.products.sortedItems
