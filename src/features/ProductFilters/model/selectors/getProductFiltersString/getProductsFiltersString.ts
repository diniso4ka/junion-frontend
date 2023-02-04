import { StateSchema } from 'app/store/config/StateSchema';

export const getProductsFiltersString = (state: StateSchema) =>
	state?.productsFilters?.queryString;
