import { StateSchema } from 'app/store/config/StateSchema';

export const getCategoryQuantity = (state: StateSchema) =>
	state.categories.quantity;
