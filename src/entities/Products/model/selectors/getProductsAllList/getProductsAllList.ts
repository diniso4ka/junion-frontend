import { StateSchema } from 'app/store/config/StateSchema';

export const getProductsAllList = (state: StateSchema) =>
	state.products.allItems;
