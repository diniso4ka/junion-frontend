import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateProductPrice = (state: StateSchema) =>
	state?.updateProduct?.form?.price || '';
