import { StateSchema } from 'app/store/config/StateSchema'

export const getProductFiltersVendor = (state: StateSchema) =>
    state?.productsFilters?.filters?.vendor || ''
