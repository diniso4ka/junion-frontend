import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateProductCategories = (state: StateSchema) =>
	state?.updateProduct?.form?.category || '';
