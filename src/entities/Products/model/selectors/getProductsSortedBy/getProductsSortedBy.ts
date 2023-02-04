import { StateSchema } from 'app/store/config/StateSchema';

export const getProductsSortedBy = (state: StateSchema) =>
	state?.products?.sortedBy;
