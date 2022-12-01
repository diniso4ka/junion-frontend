import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchVendors } from 'shared/api/requests/products'

export const thunkGetVendorsList = createAsyncThunk(
    'vendors/VendorsList',
    async (...args) => {
        try {
            const response = await fetchVendors()
            if (response.data) {
            }
            return response
        } catch (err) {
            args[1].rejectWithValue(err)
        }
    }
)
