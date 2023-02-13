import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PopupInfoSchema } from '../types/PopupInfoSchema';

const initialState: PopupInfoSchema = {
	visible: false,
	text: '',
	type: '',
};

const popupInfoSlice = createSlice({
	name: 'popupInfo',
	initialState,
	reducers: {
		setPopupInfo: (state, action: PayloadAction<PopupInfoSchema>) => {
			state.visible = true;
			state.text = action.payload.text;
			state.type = action.payload.type;
		},

		unmountPopup: (state) => {
			state.visible = false;
			state.text = '';
			state.type = '';
		},
	},
});

export const { actions: popupInfoActions } = popupInfoSlice;
export const { reducer: popupInfoReducer } = popupInfoSlice;
