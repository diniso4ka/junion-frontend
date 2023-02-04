import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateProductPrice = (state: StateSchema) =>
	state?.createProduct?.form?.price || '';
