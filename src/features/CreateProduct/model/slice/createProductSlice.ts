import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { thunkCreateProduct } from '../services/thunkCreateProduct';
import { CreateProductSchema } from '../types/CreateProductSchema';

const initialState: CreateProductSchema = {
	form: {
		name: '',
		category: '',
		price: '',
		quantity: '',
		status: '',
		discountPrice: '',
		unit: '',
		vendor: '',
		regCode: '',
	},
	isLoading: false,
};

export const createProductSlice = createSlice({
	name: 'createProduct',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.form.name = action.payload;
		},
		setCategory: (state, action: PayloadAction<string>) => {
			state.form.category = action.payload;
		},
		setPrice: (state, action: PayloadAction<string>) => {
			if (!isNaN(+action.payload)) {
				state.form.price = action.payload;
			}
		},
		setQuantity: (state, action: PayloadAction<string>) => {
			if (!isNaN(+action.payload)) {
				state.form.quantity = action.payload;
			}
		},
		setDiscountPrice: (state, action: PayloadAction<string>) => {
			if (!isNaN(+action.payload)) {
				state.form.discountPrice = action.payload;
			}
		},
		setUnit: (state, action: PayloadAction<string>) => {
			state.form.unit = action.payload;
		},
		setVendor: (state, action: PayloadAction<string>) => {
			state.form.vendor = action.payload;
		},
		setRegCode: (state, action: PayloadAction<string>) => {
			state.form.regCode = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(thunkCreateProduct.pending, (state) => {
				state.isLoading = true;
				state.error = false;
			})
			.addCase(thunkCreateProduct.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(thunkCreateProduct.rejected, (state) => {
				state.isLoading = false;
				state.error = true;
			});
	},
});

export const { actions: createProductActions } = createProductSlice;
export const { reducer: createProductReducer } = createProductSlice;
