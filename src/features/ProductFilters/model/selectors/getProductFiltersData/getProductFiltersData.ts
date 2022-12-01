import { StateSchema } from 'app/store/types'

export const getProductFiltersData = (state: StateSchema) =>
    state.productsFilters.filters
