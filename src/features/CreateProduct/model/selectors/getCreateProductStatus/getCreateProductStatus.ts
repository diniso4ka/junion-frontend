import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateProductStatus = (state: StateSchema) =>
    state?.createProduct?.isLoading
