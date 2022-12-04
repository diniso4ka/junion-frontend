import { StateSchema } from 'app/store/types'

export const getCreateProductForm = (state: StateSchema) =>
    state.createProduct.form
