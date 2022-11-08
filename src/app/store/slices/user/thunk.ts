import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    ILoginReqData,
    IRegisterReqData,
} from 'shared/helpers/validations/types'
import {
    fetchAuthMe,
    fetchLogin,
    fetchLogout,
    fetchRegister,
} from 'shared/api/requests'

export const thunkFetchRegister = createAsyncThunk(
    'users/registerStatus',
    async (data: IRegisterReqData) => {
        const res = await fetchRegister(data)
        return res
    }
)
export const thunkFetchLogin = createAsyncThunk(
    'users/loginStatus',
    async (data: ILoginReqData) => {
        const res = await fetchLogin(data)
        return res
    }
)

export const thunkFetchLogout = createAsyncThunk(
    'users/logoutStatus',
    async () => {
        const res = await fetchLogout()
        return res
    }
)

export const thunkFetchAuthMe = createAsyncThunk(
    'users/authMeStatus',
    async () => {
        const res = await fetchAuthMe()
        return res
    }
)
