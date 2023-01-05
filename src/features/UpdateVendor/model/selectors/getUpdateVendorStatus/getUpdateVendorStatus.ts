import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateVendorStatus = (state: StateSchema) =>
    state?.updateVendor?.isLoading
