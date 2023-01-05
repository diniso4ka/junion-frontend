import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateVendorAddress = (state: StateSchema) =>
    state?.updateVendor?.form?.address || ''
