import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchLogin, fetchRegister } from '../../../shared/api/requests'

import { Status } from '../../types'
import { IUserData } from './types'
import {
    ILoginReqData,
    IRegisterReqData,
} from '../../../shared/helpers/validations/types'

export const thunkFetchRegister = createAsyncThunk(
    'users/registerStatus',
    async (data: IRegisterReqData) => {
        const res = await fetchRegister(data)
        console.log(res)
        return res
    }
)
export const thunkFetchLogin = createAsyncThunk(
    'users/loginStatus',
    async (data: ILoginReqData) => {
        const res = await fetchLogin(data)
        console.log(res)
        return res
    }
)

interface initialStateType {
    user: {
        data: IUserData | null
        status: Status
    }
    errors: {
        incorrect: string | null
    }
}

const initialState: initialStateType = {
    user: {
        data: null,
        status: Status.LOADING,
    },
    errors: {
        incorrect: null,
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(thunkFetchRegister.pending, (state, action) => {
            state.user.data = null
            state.user.status = Status.LOADING
        }),
            builder.addCase(thunkFetchRegister.fulfilled, (state, action) => {
                state.user.data = null
                console.log(action)
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchRegister.rejected, (state, action) => {
                state.user.data = null
                state.user.status = Status.ERROR
            }),
            builder.addCase(thunkFetchLogin.pending, (state, action) => {
                state.user.data = null
                state.user.status = Status.LOADING
            }),
            builder.addCase(thunkFetchLogin.fulfilled, (state, action) => {
                state.user.data = null
                console.log(action)
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchLogin.rejected, (state, action) => {
                state.user.data = null
                state.errors.incorrect =
                    'Your account name or password is incorrect'
                state.user.status = Status.ERROR
            })
    },
})

export const {} = userSlice.actions
export default userSlice.reducer
