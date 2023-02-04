import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateVendorRegCode = (state: StateSchema) =>
	state?.updateVendor?.form?.regCode || '';
