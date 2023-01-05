import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateVendorName = (state: StateSchema) =>
    state?.updateVendor?.form?.name || ''
