import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateProductError = (state: StateSchema) =>
	state?.createProduct?.error;
