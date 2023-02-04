import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateProductUnit = (state: StateSchema) =>
	state?.updateProduct?.form?.unit || '';
