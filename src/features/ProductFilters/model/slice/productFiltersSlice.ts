import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createQueryParams } from 'shared/helpers/filters/createQueryParams';

import { ProductFiltersSchema } from '../types/ProductFiltersSchema';

const initialState: ProductFiltersSchema = {
	filters: {
		name: '',
		category: '',
		price_min: '',
		price_max: '',
		vendor: '',
		owner: '',
	},
	queryString: '',
	isLoading: false,
};
export const productFiltersSlice = createSlice({
	name: 'productFilters',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.filters.name = action.payload;
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.filters.category = action.payload;
		},
		setPriceMin: (state, action: PayloadAction<string>) => {
			state.filters.price_min = action.payload;
		},
		setPriceMax: (state, action: PayloadAction<string>) => {
			state.filters.price_max = action.payload;
		},
		setVendor: (state, action: PayloadAction<string>) => {
			state.filters.vendor = action.payload;
		},
		setOwner: (state, action: PayloadAction<string>) => {
			state.filters.owner = action.payload;
		},
		setQueryString: (state, action) => {
			state.queryString = action.payload;
		},
		setFilters(state, action) {
			const params = action.payload;
			let filters: any = {};
			for (const i in params) {
				filters = { ...filters, [i]: params[i] };
			}
			state.queryString = createQueryParams(filters);
			state.filters = { ...filters };
		},
		clearFilters(state) {
			state.queryString = '';
			state.filters = {
				name: '',
				category: '',
				price_min: '',
				price_max: '',
				vendor: '',
				owner: '',
			};
		},
	},
});

export const { actions: productFiltersActions } = productFiltersSlice;
export const { reducer: productFiltersReducer } = productFiltersSlice;
