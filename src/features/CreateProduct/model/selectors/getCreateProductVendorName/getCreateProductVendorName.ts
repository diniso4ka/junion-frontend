import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateProductVendorName = (state: StateSchema) =>
    state?.createProduct?.form?.unit || ''
