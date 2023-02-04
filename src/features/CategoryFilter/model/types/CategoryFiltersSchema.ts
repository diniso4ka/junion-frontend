export interface CategoryFiltersSchema {
	filters: CategoryFilter | null;
	queryString: string;
	isLoading: boolean;
	error?: string;
}

export interface CategoryFilter {}
