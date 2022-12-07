import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateProductName = (state: StateSchema) =>
    state?.createProduct?.form?.name || ''
