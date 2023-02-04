import { StateSchema } from 'app/store/config/StateSchema';

export const getVendorsSortedBy = (state: StateSchema) =>
	state.vendors.sortedBy;
