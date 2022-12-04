import { StateSchema } from 'app/store/types'

export const getCreateProductStatus = (state: StateSchema) =>
    state.createProduct.isLoading
