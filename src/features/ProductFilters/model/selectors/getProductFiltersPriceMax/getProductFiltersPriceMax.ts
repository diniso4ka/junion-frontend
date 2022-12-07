import { StateSchema } from 'app/store/config/StateSchema'

export const getProductFiltersPriceMax = (state: StateSchema) =>
    state?.productsFilters?.filters?.vendor || ''
