export interface ProductFiltersSchema {
	filters: ProductFilter | null;
	queryString: string;
	isLoading: boolean;
	error?: string;
}

export interface ProductFilter {
	name: string;
	category: string;
	price_min: string;
	price_max: string;
	vendor: string;
	owner: string;
}
