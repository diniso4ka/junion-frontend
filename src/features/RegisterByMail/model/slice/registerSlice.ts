import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	mailValidationMessages,
	superCodeValidationMessages,
} from 'shared/helpers/validations/messages';

import { thunkRegisterByMail } from '../services/RegisterByMail';
import { RegisterSchema } from '../types/RegisterSchema';

const initialState: RegisterSchema = {
	mail: '',
	password: '',
	confirmPassword: '',
	name: '',
	superCode: '',
	isLoading: false,
	asyncErrors: {},
};
export const registerSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setMail: (state, action: PayloadAction<string>) => {
			state.mail = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setConfirmPassword: (state, action: PayloadAction<string>) => {
			state.confirmPassword = action.payload;
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setSuperCode: (state, action: PayloadAction<string>) => {
			state.superCode = action.payload;
		},
		clearInputs: (state) => {
			state.mail = '';
			state.password = '';
			state.confirmPassword = '';
			state.name = '';
			state.superCode = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(thunkRegisterByMail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(thunkRegisterByMail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.asyncErrors = {};
			})
			.addCase(thunkRegisterByMail.rejected, (state, action) => {
				state.isLoading = false;
				// @ts-ignore
				const response = action.payload?.response.data.message;
				if (response.includes('email')) {
					state.asyncErrors.mail = mailValidationMessages.already;
				}
				if (response.includes('superCode')) {
					state.asyncErrors.superCode = superCodeValidationMessages.incorrect;
				}
			});
	},
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
