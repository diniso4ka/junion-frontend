import { AxiosPromise } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from 'shared/api/requests/categories';

import { ThunkConfig } from '../../../../app/store/config/StateSchema';
import { categoriesActions } from '../slice/categoriesSlice';
import { Category } from '../types/CategoriesSchema';

interface getCategoriesResponseType {
	quantity: number;
	data: Category[];
}

export const thunkGetCategoriesList = createAsyncThunk<
	AxiosPromise<getCategoriesResponseType>,
	void,
	ThunkConfig<string>
>('categories/CategoriesList', async (_, thunkAPI) => {
	try {
		const response = await fetchCategories();
		if (response.data) {
			thunkAPI.dispatch(categoriesActions.setCategories(response.data.data));
			thunkAPI.dispatch(categoriesActions.setQuantity(response.data.quantity));
		}
		return response;
	} catch (err) {
		thunkAPI.rejectWithValue(err);
	}
});
