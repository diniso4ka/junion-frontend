import { StateSchema } from 'app/store/config/StateSchema';

export const getProductsInitialize = (state: StateSchema) =>
	state.products.productInitialize;
