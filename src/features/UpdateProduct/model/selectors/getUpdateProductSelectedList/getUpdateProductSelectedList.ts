import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateProductSelectedList = (state: StateSchema) =>
	state?.updateProduct?.selectedItems || [];
