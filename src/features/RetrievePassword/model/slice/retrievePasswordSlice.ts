import { RetrievePasswordSchema } from '../types/RetrievePasswordSchema'
import { createSlice } from '@reduxjs/toolkit'
import { thunkEnterMail } from '../services/thunkEnterMail'

const initialState: RetrievePasswordSchema = {
    form: {
        password: '',
        confirmPassword: '',
    },
    mail: '',
    isLoading: false,
}

const retrievePasswordSlice = createSlice({
    name: 'retrievePassword',
    initialState,
    reducers: {
        setMail: (state, action) => {
            state.mail = action.payload
        },
        setPassword: (state, action) => {
            state.form.password = action.payload
        },
        setConfirmPassword: (state, action) => {
            state.form.confirmPassword = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkEnterMail.pending, (state, action) => {
                state.error = false
                state.isLoading = true
            })
            .addCase(thunkEnterMail.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(thunkEnterMail.rejected, (state, action) => {
                state.error = true
                state.isLoading = false
            })
    },
})

export const { actions: retrievePasswordActions } = retrievePasswordSlice
export const { reducer: retrievePasswordReducer } = retrievePasswordSlice
