import { AxiosPromise } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from 'shared/api/requests/products';

import { ThunkConfig } from '../../../../app/store/config/StateSchema';
import { productsActions } from '../slice/productsSlice';
import { ProductType } from '../types/ProductsSchema';

interface getProductsResponseType {
	quantity: number;
	result: ProductType[];
}

export const thunkFetchProductList = createAsyncThunk<
	AxiosPromise<getProductsResponseType>,
	void,
	ThunkConfig<string>
>('products/ProductList', async (_, thunkAPI) => {
	try {
		const response = await fetchProducts();
		if (response.data) {
			thunkAPI.dispatch(productsActions.setProducts(response));
			thunkAPI.dispatch(productsActions.setFilteredProductsList(response));
		}
		return response;
	} catch (err) {
		thunkAPI.rejectWithValue(err);
	}
});
