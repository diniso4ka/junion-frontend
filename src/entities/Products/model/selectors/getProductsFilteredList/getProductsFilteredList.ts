import { StateSchema } from 'app/store/config/StateSchema'

export const getProductsFilteredList = (state: StateSchema) =>
    state.products.filteredItems
