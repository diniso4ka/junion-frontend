import { StateSchema } from 'app/store/config/StateSchema';

export const getUpdateProductDiscountPrice = (state: StateSchema) =>
	state?.updateProduct?.form?.discountPrice || '';
