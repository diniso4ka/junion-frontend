import { StateSchema } from 'app/store/config/StateSchema';

export const getSortProductsDeletedToday = (state: StateSchema) =>
	state?.sortProducts?.deletedToday;
