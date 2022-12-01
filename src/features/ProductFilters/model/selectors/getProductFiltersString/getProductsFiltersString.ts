import { StateSchema } from 'app/store/types'

export const getProductsFiltersString = (state: StateSchema) =>
    state.productsFilters.queryString
