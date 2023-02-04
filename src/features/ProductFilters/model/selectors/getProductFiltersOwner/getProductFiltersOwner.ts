import { StateSchema } from 'app/store/config/StateSchema';

export const getProductFiltersOwner = (state: StateSchema) =>
	state?.productsFilters?.filters?.owner || '';
