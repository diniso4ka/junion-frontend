import { createSlice } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_TOKEN } from 'shared/config/consts/localStorage';

import { thunkCheckAuthMe } from '../services/CheckAuthMe';
import { thunkLogout } from '../services/Logout';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {
	initialize: false,
};
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action) => {
			state.authData = action.payload;
		},
		initAuthData: (state, action) => {
			state.authData = action.payload;
		},
		logout: (state) => {
			state.authData = undefined;
			localStorage.removeItem(USER_LOCALSTORAGE_TOKEN);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(thunkCheckAuthMe.fulfilled, (state, action) => {
				if (!state.initialize) {
					state.initialize = true;
				}
			})
			.addCase(thunkCheckAuthMe.rejected, (state, action) => {
				if (!state.initialize) {
					state.initialize = true;
				}
			})
			.addCase(thunkLogout.pending, (state) => {
				state.authData = undefined;
			})
			.addCase(thunkLogout.fulfilled, (state) => {
				state.authData = undefined;
			})
			.addCase(thunkLogout.rejected, (state) => {
				state.authData = undefined;
			});
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
