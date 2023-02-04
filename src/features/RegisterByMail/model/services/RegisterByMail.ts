import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from 'entities/User';
import { fetchRegister } from 'shared/api/requests/user';
import { saveTokenInLocalStorage } from 'shared/helpers/localStorage/localStorage';

import { loginActions } from '../../../AuthByMail/model/slice/loginSlice';
import { registerActions } from '../slice/registerSlice';

export interface RegisterByMailProps {
	email: string;
	password: string;
	name: string;
	superCode: string;
}
export const thunkRegisterByMail = createAsyncThunk(
	'register/RegisterByMail',
	async (userData: RegisterByMailProps, thunkAPI) => {
		try {
			const response = await fetchRegister(userData);
			if (response.data) {
				const { _id, token, email, ...otherProps } = await response.data.user;
				await saveTokenInLocalStorage(token);
				thunkAPI.dispatch(
					userActions.setAuthData({ email: email, ...otherProps }),
				);
				await thunkAPI.dispatch(registerActions.clearInputs());
				await thunkAPI.dispatch(loginActions.clearInputs());
			}
			return response;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	},
);
