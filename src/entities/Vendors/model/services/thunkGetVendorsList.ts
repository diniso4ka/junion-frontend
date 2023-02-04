import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVendors } from 'shared/api/requests/vendors';

import { vendorsActions } from '../slice/vendorsSlice';

export const thunkGetVendorsList = createAsyncThunk(
	'vendors/VendorsList',
	async (...args) => {
		try {
			const response = await fetchVendors();
			if (!response.data) {
				throw new Error();
			}
			args[1].dispatch(vendorsActions.setVendors(response.data.data));
			args[1].dispatch(vendorsActions.setQuantity(response.data.quantity));
			return response;
		} catch (err) {
			args[1].rejectWithValue(err);
		}
	},
);
