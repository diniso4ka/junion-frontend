import { StateSchema } from 'app/store/config/StateSchema';

export const getCategoryStatus = (state: StateSchema) =>
	state.categories.isLoading;
