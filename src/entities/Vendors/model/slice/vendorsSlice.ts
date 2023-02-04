import { createSlice } from '@reduxjs/toolkit';

import { sortByAlphabet } from '../../../../shared/helpers/sort/byAlphabet';
import { thunkGetVendorsList } from '../services/thunkGetVendorsList';
import {
	VendorsSchema,
	VendorsSort,
	VendorsSortType,
} from '../types/VendorsSchema';

const initialState: VendorsSchema = {
	items: [],
	sortedBy: {
		type: null,
		sort: VendorsSort.ASC,
	},
	quantity: 0,
	isLoading: false,
};
export const vendorsSlice = createSlice({
	name: 'vendors',
	initialState,
	reducers: {
		setVendors: (state, action) => {
			state.items = [...action.payload];
			state.filteredItems = [...action.payload];
		},
		updateVendor: (state, action) => {
			state.items = state.items.map((vendor) => {
				if (vendor._id === action.payload.id) {
					return action.payload;
				} else {
					return vendor;
				}
			});
			state.filteredItems = [...state.items];
		},
		deleteVendor: (state, action) => {
			state.items = state.items.filter(
				(vendor) => vendor._id !== action.payload,
			);
			state.filteredItems = [...state.items];
		},
		setQuantity: (state, action) => {
			state.quantity = action.payload;
		},

		//Сортировка на Vendors page
		sortByRegCode: (state) => {
			if (state.sortedBy.type === VendorsSortType.VENDOR_REG_CODE) {
				state.sortedBy.sort =
					state.sortedBy.sort === VendorsSort.ASC
						? VendorsSort.DESC
						: VendorsSort.ASC;
			} else {
				state.sortedBy.sort = VendorsSort.DESC;
				state.sortedBy.type = VendorsSortType.VENDOR_REG_CODE;
			}
			if (state.sortedBy.sort === VendorsSort.DESC) {
				state.filteredItems = state.filteredItems
					.sort((a, b) => +a.regCode - +b.regCode)
					.reverse();
			} else {
				state.filteredItems = state.filteredItems.reverse();
			}
		},
		sortByName: (state) => {
			if (state.sortedBy.type === VendorsSortType.VENDOR_NAME) {
				state.sortedBy.sort =
					state.sortedBy.sort === VendorsSort.ASC
						? VendorsSort.DESC
						: VendorsSort.ASC;
			} else {
				state.sortedBy.sort = VendorsSort.DESC;
				state.sortedBy.type = VendorsSortType.VENDOR_NAME;
			}
			if (state.sortedBy.sort === VendorsSort.DESC) {
				state.filteredItems = state.filteredItems
					.sort((a, b) => sortByAlphabet(a.name, b.name))
					.reverse();
			} else {
				state.filteredItems = state.filteredItems.reverse();
			}
		},
		sortByCode: (state) => {
			if (state.sortedBy.type === VendorsSortType.VENDOR_CODE) {
				state.sortedBy.sort =
					state.sortedBy.sort === VendorsSort.ASC
						? VendorsSort.DESC
						: VendorsSort.ASC;
			} else {
				state.sortedBy.sort = VendorsSort.DESC;
				state.sortedBy.type = VendorsSortType.VENDOR_CODE;
			}
			if (state.sortedBy.sort === VendorsSort.DESC) {
				state.filteredItems = state.filteredItems
					.sort((a, b) => +a.code - +b.code)
					.reverse();
			} else {
				state.filteredItems = state.filteredItems.reverse();
			}
		},
		clearSort: (state) => {
			state.sortedBy = {
				type: null,
				sort: VendorsSort.ASC,
			};
			state.filteredItems = [...state.items];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(thunkGetVendorsList.pending, (state) => {
				state.isLoading = true;
				state.error = false;
			})
			.addCase(thunkGetVendorsList.fulfilled, (state, action) => {
				state.isLoading = false;
				// @ts-ignore
			})
			.addCase(thunkGetVendorsList.rejected, (state) => {
				state.isLoading = false;
				state.error = true;
				state.filteredItems = [...state.items];
			});
	},
});

export const { actions: vendorsActions } = vendorsSlice;
export const { reducer: vendorsReducer } = vendorsSlice;
