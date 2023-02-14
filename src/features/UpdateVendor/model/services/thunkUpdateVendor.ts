import { createAsyncThunk } from '@reduxjs/toolkit';

import { vendorsActions } from '../../../../entities/Vendors';
import { fetchUpdateVendor } from '../../../../shared/api/requests/vendors';
import { updateVendorActions } from '../slice/updateVendorSlice';

export interface thunkCreateVendorProps {
	id: string;
	name: string;
	address: string;
	regCode: string;
	code: string;
}

export const thunkUpdateVendor = createAsyncThunk(
	'vendors/UpdateVendor',
	async (vendorData: thunkCreateVendorProps, thunkAPI) => {
		try {
			const response = await fetchUpdateVendor(vendorData);
			if (!response?.data) {
				throw new Error();
			}
			thunkAPI.dispatch(updateVendorActions.clearSelect());
			thunkAPI.dispatch(vendorsActions.updateVendor(response.data.newData));
			return response;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	},
);
