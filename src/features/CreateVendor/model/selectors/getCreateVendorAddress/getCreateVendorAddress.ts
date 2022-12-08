import { StateSchema } from 'app/store/config/StateSchema'

export const getCreateVendorAddress = (state: StateSchema) =>
    state?.createVendor?.form?.address || ''
