import { StateSchema } from 'app/store/types'

export const getFilteredProductsList = (state: StateSchema) =>
    state.products.filteredItems
