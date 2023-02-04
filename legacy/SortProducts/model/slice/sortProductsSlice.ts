import { createSlice } from '@reduxjs/toolkit';

import {
	Sort,
	SortType,
} from '../../../../src/pages/Private/Home/model/types/sort';
import { formattedDate } from '../../../../src/shared/helpers/date/formattedDate';

const initialState: Sort = {
	withoutPrice: [],
	withoutCategory: [],
	withoutQuantity: [],
	addedToday: [],
	deletedToday: [],
	selectedSort: 0,
	sortType: SortType.WITHOUT_PRICE,
};

const sortProductsSlice = createSlice({
	name: 'sortProduct',
	initialState,
	reducers: {
		sortProducts: (state, action) => {
			state.withoutPrice = action.payload.items.filter((item) => !item.price);
			state.withoutCategory = action.payload.items.filter(
				(item) => item.category[0] === 'unSorted',
			);
			state.withoutQuantity = action.payload.items.filter(
				(item) => !item.quantity,
			);
			state.addedToday = action.payload.items.filter(
				(item) =>
					formattedDate() === item.createdAt.split('').splice(0, 10).join(''),
			);
			state.deletedToday = action.payload.items.filter(
				(item) =>
					item.status === 'deleted' &&
					formattedDate() === item.updatedAt.split('').splice(0, 10).join(''),
			);
		},
		selectSort: () => {},
	},
});

export const { reducer: sortProductsSliceReducer } = sortProductsSlice;
export const { actions: sortProductsSliceActions } = sortProductsSlice;
