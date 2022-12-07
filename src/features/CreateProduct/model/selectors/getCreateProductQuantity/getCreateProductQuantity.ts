import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateProductQuantity = (state: StateSchema) =>
    state?.createProduct?.form?.quantity || ''
