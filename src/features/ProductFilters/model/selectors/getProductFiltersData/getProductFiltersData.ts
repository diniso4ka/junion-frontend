import { StateSchema } from 'app/store/config/StateSchema'

export const getProductFiltersData = (state: StateSchema) =>
    state?.productsFilters?.filters
