import { StateSchema } from 'app/store/config/StateSchema'

export const getFilteredProductsList = (state: StateSchema) =>
    state.products.filteredItems
