import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/LoginSchema'
import { thunkLoginByMail } from '../services/LoginByMail'
import { loginValidationMessages } from 'shared/helpers/validations/messages'

const initialState: LoginSchema = {
    mail: '',
    password: '',
    isLoading: false,
}
export const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMail: (state, action: PayloadAction<string>) => {
            state.mail = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        clearInputs: state => {
            state.mail = ''
            state.password = ''
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkLoginByMail.pending, state => {
                state.isLoading = true
            })
            .addCase(thunkLoginByMail.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(thunkLoginByMail.rejected, state => {
                state.isLoading = false
                state.error = loginValidationMessages.incorrect
            })
    },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
