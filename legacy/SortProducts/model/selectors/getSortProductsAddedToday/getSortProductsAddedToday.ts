import { StateSchema } from 'app/store/config/StateSchema';

export const getSortProductsAddedToday = (state: StateSchema) =>
	state?.sortProducts?.addedToday;
