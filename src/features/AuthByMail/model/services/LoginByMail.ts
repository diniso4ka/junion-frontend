import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLogin } from 'shared/api/requests/user'
import { response } from 'express'
import { saveTokenInLocalStorage } from 'shared/helpers/localStorage/localStorage'
import { registerActions } from '../../../RegisterByMail'
import { loginActions } from '../slice/loginSlice'

export interface LoginByMailProps {
    email: string
    password: string
}

export const thunkLoginByMail = createAsyncThunk(
    'login/LoginByMail',
    async (authData: LoginByMailProps, thunkAPI) => {
        try {
            const response = await fetchLogin(authData)
            if (response.data) {
                await saveTokenInLocalStorage(response.data.token)
                await thunkAPI.dispatch(registerActions.clearInputs())
                await thunkAPI.dispatch(loginActions.clearInputs())
            }
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
