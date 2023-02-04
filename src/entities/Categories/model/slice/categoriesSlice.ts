import { createSlice } from '@reduxjs/toolkit';

import { sortByAlphabet } from '../../../../shared/helpers/sort/byAlphabet';
import {
	VendorsSort,
	VendorsSortType,
} from '../../../Vendors/model/types/VendorsSchema';
import { thunkGetCategoriesList } from '../services/thunkGetCategoriesList';
import {
	CategoriesSchema,
	CategoriesSort,
	CategoriesSortType,
} from '../types/CategoriesSchema';

const initialState: CategoriesSchema = {
	items: [],
	filteredItems: [],
	sortedBy: {
		type: null,
		sort: CategoriesSort.ASC,
	},
	quantity: 0,
	isLoading: false,
};
export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories: (state, action) => {
			state.items = [...action.payload];
			state.filteredItems = [...action.payload];
		},
		setQuantity: (state, action) => {
			state.quantity = action.payload;
		},

		//Сортировка на Category page
		sortByCategory: (state) => {
			if (state.sortedBy.type === CategoriesSortType.CATEGORY_CATEGORY) {
				state.sortedBy.sort =
					state.sortedBy.sort === CategoriesSort.ASC
						? CategoriesSort.DESC
						: CategoriesSort.ASC;
			} else {
				state.sortedBy.sort = CategoriesSort.DESC;
				state.sortedBy.type = CategoriesSortType.CATEGORY_CATEGORY;
			}
			if (state.sortedBy.sort === CategoriesSort.DESC) {
				state.filteredItems = state.filteredItems
					.sort((a, b) => sortByAlphabet(a._id, b._id))
					.reverse();
			} else {
				state.filteredItems = state.filteredItems.reverse();
			}
		},
		sortByQuantity: (state) => {
			if (state.sortedBy.type === CategoriesSortType.CATEGORY_QUANTITY) {
				state.sortedBy.sort =
					state.sortedBy.sort === CategoriesSort.ASC
						? CategoriesSort.DESC
						: CategoriesSort.ASC;
			} else {
				state.sortedBy.sort = CategoriesSort.DESC;
				state.sortedBy.type = CategoriesSortType.CATEGORY_QUANTITY;
			}
			if (state.sortedBy.sort === CategoriesSort.DESC) {
				state.filteredItems = state.filteredItems
					.sort((a, b) => a.quantity - b.quantity)
					.reverse();
			} else {
				state.filteredItems = state.filteredItems.reverse();
			}
		},

		clearSort: (state) => {
			state.sortedBy = {
				type: null,
				sort: CategoriesSort.ASC,
			};
			state.filteredItems = [...state.items];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(thunkGetCategoriesList.pending, (state) => {
				state.isLoading = true;
				state.error = false;
			})
			.addCase(thunkGetCategoriesList.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(thunkGetCategoriesList.rejected, (state) => {
				state.isLoading = false;
				state.error = true;
			});
	},
});

export const { actions: categoriesActions } = categoriesSlice;
export const { reducer: categoriesReducer } = categoriesSlice;
