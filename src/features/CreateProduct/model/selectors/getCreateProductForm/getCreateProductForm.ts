import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateProductForm = (state: StateSchema) =>
    state.createProduct.form
