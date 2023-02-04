import { StateSchema } from 'app/store/config/StateSchema';

export const getVendorsList = (state: StateSchema) => state.vendors.items;
