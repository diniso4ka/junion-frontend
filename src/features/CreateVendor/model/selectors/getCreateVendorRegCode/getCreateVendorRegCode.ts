import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateVendorRegCode = (state: StateSchema) =>
	state?.createVendor?.form?.regCode || '';
