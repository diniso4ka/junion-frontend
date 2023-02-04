import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateVendorName = (state: StateSchema) =>
	state?.createVendor?.form?.name || '';
