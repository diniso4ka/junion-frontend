import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateVendorStatus = (state: StateSchema) =>
	state?.createVendor?.isLoading;
