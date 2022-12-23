import { StateSchema } from 'app/store/config/StateSchema'

export const getCategoryFilteredList = (state: StateSchema) =>
    state.categories.filteredItems
