import { StateSchema } from 'app/store/config/StateSchema';

export const getSortProductsSelectedSort = (state: StateSchema) =>
	state?.sortProducts?.selectedSort;
