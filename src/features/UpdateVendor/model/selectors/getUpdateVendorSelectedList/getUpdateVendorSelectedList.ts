import { StateSchema } from 'app/store/config/StateSchema'

export const getUpdateVendorSelectedList = (state: StateSchema) =>
    state?.updateVendor?.selectedItems || []
