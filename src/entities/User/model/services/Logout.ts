import { AxiosPromise } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLogout } from 'shared/api/requests/user';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/config/consts/localStorage';

import { ThunkConfig } from '../../../../app/store/config/StateSchema';

interface logoutResponseType {
	message: string;
}

export const thunkLogout = createAsyncThunk<
	AxiosPromise<logoutResponseType>,
	void,
	ThunkConfig<string>
>('user/logout', async (_, thunkAPI) => {
	try {
		const response = await fetchLogout();
		localStorage.removeItem(USER_LOCALSTORAGE_TOKEN);
		return response;
	} catch (err) {
		thunkAPI.rejectWithValue(err);
	}
});
