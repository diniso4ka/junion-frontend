import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateProductUnit = (state: StateSchema) =>
	state?.createProduct?.form?.unit || '';
