import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateProductRegCode = (state: StateSchema) =>
    state?.createProduct?.form?.regCode || ''
