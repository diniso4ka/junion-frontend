import { StateSchema } from 'app/store/config/StateSchema';

export const getProductsStatus = (state: StateSchema) =>
	state.products.isLoading;
