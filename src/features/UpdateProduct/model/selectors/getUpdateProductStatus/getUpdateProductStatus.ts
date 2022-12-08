import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateProductStatus = (state: StateSchema) =>
    state?.updateProduct?.isLoading
