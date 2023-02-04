export interface CategoriesSchema {
	items?: Category[];
	filteredItems?: Category[];
	sortedBy?: CategoriesSortedBy;
	quantity: number;
	isLoading: boolean;
	error?: boolean;
}

export interface Category {
	_id: string;
	quantity: number;
}

export interface CategoriesSortedBy {
	sort?: CategoriesSort;
	type?: CategoriesSortType;
}

export enum CategoriesSort {
	ASC = 'asc',
	DESC = 'desc',
}

export enum CategoriesSortType {
	CATEGORY_CATEGORY = 'CATEGORY_CATEGORY',
	CATEGORY_QUANTITY = 'CATEGORY_QUANTITY',
}
