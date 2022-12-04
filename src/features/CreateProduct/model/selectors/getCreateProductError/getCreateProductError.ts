import { StateSchema } from 'app/store/types'

export const getCreateProductError = (state: StateSchema) =>
    state.createProduct.error
