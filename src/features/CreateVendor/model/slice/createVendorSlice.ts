import { CreateVendorSchema } from '../types/CreateVendorSchema'
import { createSlice } from '@reduxjs/toolkit'
import { fetchCreateVendor } from '../../../../shared/api/requests/vendors'
import { thunkCreateProduct } from '../../../CreateProduct/model/services/thunkCreateProduct'
import { thunkCreateVendor } from '../services/thunkCreateVendor'

const initialState: CreateVendorSchema = {
    form: {
        name: '',
        address: '',
        regCode: '',
    },
    isLoading: false,
}

const createVendorSlice = createSlice({
    name: 'createVendor',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.form.name = action.payload
        },
        setAddress: (state, action) => {
            state.form.address = action.payload
        },
        setRegCode: (state, action) => {
            state.form.regCode = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkCreateVendor.pending, state => {
                state.isLoading = true
                state.error = false
            })
            .addCase(thunkCreateVendor.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(thunkCreateVendor.rejected, state => {
                state.isLoading = false
                state.error = true
            })
    },
})

export const { reducer: createVendorReducer } = createVendorSlice
export const { actions: createVendorActions } = createVendorSlice
