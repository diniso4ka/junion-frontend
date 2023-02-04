import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateProductError = (state: StateSchema) =>
	state?.updateProduct?.error;
