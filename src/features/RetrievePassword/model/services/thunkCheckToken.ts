import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkCheckAuthMe } from 'entities/User';
import { fetchCheckToken } from 'shared/api/requests/user';
import { saveTokenInLocalStorage } from 'shared/helpers/localStorage/localStorage';

import { ThunkConfig } from '../../../../app/store/config/StateSchema';

export interface thunkCheckTokenProps {
	verifyToken: string;
}

export const thunkCheckToken = createAsyncThunk<
	any,
	thunkCheckTokenProps,
	ThunkConfig<string>
>('retrieve/CheckToken ', async (verificationToken, thunkAPI) => {
	try {
		console.log(thunkAPI.extra);
		const response = await fetchCheckToken(verificationToken);
		if (!response.data) {
			throw new Error();
		}
		await saveTokenInLocalStorage(response.data.user.token);
		await thunkAPI.dispatch(thunkCheckAuthMe());
		return response;
	} catch (err) {
		return thunkAPI.rejectWithValue('error');
	}
});
