import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateProductVendorName = (state: StateSchema) =>
	state?.updateProduct?.form?.vendor || '';
