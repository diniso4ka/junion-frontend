import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateVendorError = (state: StateSchema) =>
	state?.createVendor?.error;
