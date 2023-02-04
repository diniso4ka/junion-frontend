import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vendor } from 'entities/Vendors/model/types/VendorsSchema';

import { thunkDeleteVendor } from '../services/thunkDeleteVendor';
import { thunkUpdateVendor } from '../services/thunkUpdateVendor';
import { UpdateVendorSchema } from '../types/UpdateVendorSchema';

const initialState: UpdateVendorSchema = {
	form: {
		name: '',
		address: '',
		regCode: '',
	},
	selectedItems: [],
	isLoading: false,
};

export const updateVendorSlice = createSlice({
	name: 'updateVendor',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.form.name = action.payload;
		},
		setAddress: (state, action) => {
			state.form.address = action.payload;
		},
		setRegCode: (state, action) => {
			state.form.regCode = action.payload;
		},
		selectVendor: (state, action: PayloadAction<Vendor>) => {
			if (
				state.selectedItems.find((vendor) => vendor._id === action.payload._id)
			) {
				state.selectedItems = state.selectedItems.filter(
					(vendor) => vendor._id !== action.payload._id,
				);
			} else {
				state.selectedItems = [...state.selectedItems, action.payload];
			}
		},
		clearSelect: (state) => {
			state.selectedItems = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(thunkDeleteVendor.pending, (state, action) => {
				state.isLoading = true;
				state.error = false;
			})
			.addCase(thunkDeleteVendor.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(thunkDeleteVendor.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
			})
			.addCase(thunkUpdateVendor.pending, (state, action) => {
				state.isLoading = true;
				state.error = false;
			})
			.addCase(thunkUpdateVendor.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(thunkUpdateVendor.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
			});
	},
});

export const { actions: updateVendorActions } = updateVendorSlice;
export const { reducer: updateVendorReducer } = updateVendorSlice;
