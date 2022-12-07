import { StateSchema } from 'app/store/config/StateSchema'

export const getProductFiltersName = (state: StateSchema) =>
    state?.productsFilters?.filters?.name || ''
