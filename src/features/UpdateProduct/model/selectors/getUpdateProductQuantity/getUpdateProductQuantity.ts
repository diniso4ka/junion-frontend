import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateProductQuantity = (state: StateSchema) =>
    state?.updateProduct?.form?.quantity || ''
