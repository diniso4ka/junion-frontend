import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateProductId = (state: StateSchema) =>
    state?.updateProduct?.form?._id || ''
