import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateProductForm = (state: StateSchema) =>
    state.updateProduct.form
