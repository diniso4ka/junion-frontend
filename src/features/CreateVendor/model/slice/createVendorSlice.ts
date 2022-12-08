import { CreateVendorSchema } from '../types/CreateVendorSchema'
import { createSlice } from '@reduxjs/toolkit'

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
})

export const { reducer: createVendorReducer } = createVendorSlice
export const { actions: createVendorActions } = createVendorSlice
