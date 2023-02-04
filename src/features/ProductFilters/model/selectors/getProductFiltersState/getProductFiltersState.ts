import { StateSchema } from 'app/store/config/StateSchema';

export const getProductFiltersState = (state: StateSchema) =>
	state?.productsFilters;
