import { StateSchema } from 'app/store/config/StateSchema'

export const getVendorsStatus = (state: StateSchema) => state.vendors.isLoading
