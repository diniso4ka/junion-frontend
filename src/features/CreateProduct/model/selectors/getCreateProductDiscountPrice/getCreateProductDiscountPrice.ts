import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateProductDiscountPrice = (state: StateSchema) =>
    state?.createProduct?.form?.discountPrice || ''
