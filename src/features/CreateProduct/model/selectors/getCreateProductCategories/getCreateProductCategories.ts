import { StateSchema } from 'app/store/config/StateSchema';

export const getCreateProductCategories = (state: StateSchema) =>
	state?.createProduct?.form?.category || '';
