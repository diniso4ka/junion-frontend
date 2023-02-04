import { StateSchema } from 'app/store/config/StateSchema';

export const getSortProductsWithoutPrice = (state: StateSchema) =>
	state?.sortProducts?.withoutPrice;
