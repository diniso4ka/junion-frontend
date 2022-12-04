import { createSlice } from '@reduxjs/toolkit'
import { VendorsSchema } from '../types/VendorsSchema'
import { thunkGetVendorsList } from '../services/thunkGetVendorsList'

const initialState: VendorsSchema = {
    items: [],
    quantity: 0,
    isLoading: false,
}
export const vendorsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setVendors: (state, action) => {
            state.items = action.payload
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkGetVendorsList.pending, state => {
                state.isLoading = true
                state.error = false
            })
            .addCase(thunkGetVendorsList.fulfilled, (state, action) => {
                state.isLoading = false
                // @ts-ignore
            })
            .addCase(thunkGetVendorsList.rejected, state => {
                state.isLoading = false
                state.error = true
            })
    },
})

export const { actions: vendorsActions } = vendorsSlice
export const { reducer: vendorsReducer } = vendorsSlice
