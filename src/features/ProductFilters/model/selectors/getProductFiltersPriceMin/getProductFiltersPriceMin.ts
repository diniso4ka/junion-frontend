import { StateSchema } from 'app/store/config/StateSchema';

export const getProductFiltersPriceMin = (state: StateSchema) =>
	state?.productsFilters?.filters?.price_min || '';
