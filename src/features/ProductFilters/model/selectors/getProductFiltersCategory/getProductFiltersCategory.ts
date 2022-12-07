import { StateSchema } from 'app/store/config/StateSchema'

export const getProductFiltersCategory = (state: StateSchema) =>
    state?.productsFilters?.filters?.category || ''
