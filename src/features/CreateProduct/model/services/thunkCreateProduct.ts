import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCreateProduct } from 'shared/api/requests/products';

export interface CreateProductProps {
	name: string;
	price: number;
	quantity: number;
	unit: string;
	category: string;
	discountPrice?: number;
	vendor: string;
}

export const thunkCreateProduct = createAsyncThunk(
	'products/CreateProducts',
	async (productData: CreateProductProps, thunkAPI) => {
		try {
			const response = await fetchCreateProduct(productData);
			if (!response.data) {
				throw new Error();
			}
			return response;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	},
);
