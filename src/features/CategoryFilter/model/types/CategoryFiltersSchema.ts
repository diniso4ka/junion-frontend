export interface CategoryFiltersSchema {
	filters: CategoryFilter | null;
	queryString: string;
	isLoading: boolean;
	error?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CategoryFilter {} //TODO eslint-ignore
