import { AxiosPromise } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthMe } from 'shared/api/requests/user';

import { ThunkConfig } from '../../../../app/store/config/StateSchema';
import { userActions } from '../slice/userSlice';
import { User } from '../types/user';

export const thunkCheckAuthMe = createAsyncThunk<
	AxiosPromise<User>,
	void,
	ThunkConfig<string>
>('user/checkAuthMe', async (_, thunkAPI) => {
	const response = await fetchAuthMe();
	thunkAPI.dispatch(userActions.setAuthData(response.data.user));
	return response;
});
