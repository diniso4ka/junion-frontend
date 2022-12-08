import { RetrievePasswordSchema } from '../types/RetrievePasswordSchema'
import { createSlice } from '@reduxjs/toolkit'

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
})

export const { actions: retrievePasswordActions } = retrievePasswordSlice
export const { reducer: retrievePasswordReducer } = retrievePasswordSlice
