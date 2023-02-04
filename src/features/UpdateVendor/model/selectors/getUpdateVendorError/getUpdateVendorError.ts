import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateVendorError = (state: StateSchema) =>
	state?.updateVendor?.error;
