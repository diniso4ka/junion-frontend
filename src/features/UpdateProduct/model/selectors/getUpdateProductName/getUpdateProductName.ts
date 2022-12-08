import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateProductName = (state: StateSchema) =>
    state?.updateProduct?.form?.name || ''
