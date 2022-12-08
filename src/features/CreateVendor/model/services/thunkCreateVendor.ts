import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCreateVendor } from '../../../../shared/api/requests/vendors'

export interface thunkCreateVendorProps {
    name: string
    regCode: string
    address: string
}

export const thunkCreateVendor = createAsyncThunk(
    'vendors/CreateVendor',
    async (vendorData: thunkCreateVendorProps, thunkAPI) => {
        try {
            const response = await fetchCreateVendor(vendorData)
            if (!response?.data) {
                throw new Error()
            }
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
