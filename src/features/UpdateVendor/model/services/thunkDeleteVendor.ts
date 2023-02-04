import { createAsyncThunk } from '@reduxjs/toolkit';

import { vendorsActions } from '../../../../entities/Vendors';
import { fetchDeleteVendor } from '../../../../shared/api/requests/vendors';
import { updateVendorActions } from '../slice/updateVendorSlice';

export type thunkCreateVendorProps = string;

export const thunkDeleteVendor = createAsyncThunk(
	'vendors/DeleteVendor',
	async (vendorData: thunkCreateVendorProps, thunkAPI) => {
		try {
			const response = await fetchDeleteVendor(vendorData);
			if (!response?.data) {
				throw new Error();
			}
			thunkAPI.dispatch(updateVendorActions.clearSelect());
			thunkAPI.dispatch(vendorsActions.deleteVendor(vendorData));
			return response;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	},
);
