import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
    fetchAuthMe,
    fetchLogin,
    fetchLogout,
    fetchRegister,
} from '../../../../shared/api/requests'

import { Status } from '../../types'
import { IUserData } from './types'
import {
    ILoginReqData,
    IRegisterReqData,
} from '../../../../shared/helpers/validations/types'

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
        console.log(res)
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

interface initialStateType {
    user: {
        data: IUserData | null
        status: Status
    }
    errors: {
        incorrect: string | null
        wrongSuperCode: boolean
    }
    initialize: boolean
}

const initialState: initialStateType = {
    user: {
        data: null,
        status: Status.LOADING,
    },
    errors: {
        incorrect: null,
        wrongSuperCode: false,
    },
    initialize: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(thunkFetchRegister.pending, (state, action) => {
            state.user.status = Status.LOADING
        }),
            builder.addCase(thunkFetchRegister.fulfilled, (state, action) => {
                if (
                    action.payload.response.data.message === 'wrong super code'
                ) {
                    state.errors.wrongSuperCode = true
                }
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchRegister.rejected, (state, action) => {
                console.log(action)
                state.user.status = Status.ERROR
            }),
            builder.addCase(thunkFetchLogin.pending, (state, action) => {
                state.errors.incorrect = null
                state.user.status = Status.LOADING
            }),
            builder.addCase(thunkFetchLogin.fulfilled, (state, action) => {
                state.errors.incorrect = null
                if (action.payload?.data?.message === 'login successfull')
                    localStorage.setItem(
                        'token',
                        JSON.stringify(action.payload.data.token)
                    )
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchLogin.rejected, state => {
                state.errors.incorrect =
                    'Your account name or password is incorrect'
                state.user.status = Status.ERROR
            }),
            builder.addCase(thunkFetchAuthMe.pending, state => {
                state.user.data = null
                state.user.status = Status.LOADING
            }),
            builder.addCase(thunkFetchAuthMe.fulfilled, (state, action) => {
                state.user.data = action.payload.data.user
                state.initialize = true
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchAuthMe.rejected, state => {
                state.user.data = null
                state.user.status = Status.ERROR
            }),
            builder.addCase(thunkFetchLogout.pending, state => {
                state.user.data = null
                window.localStorage.removeItem('token')
                state.user.status = Status.LOADING
            }),
            builder.addCase(thunkFetchLogout.fulfilled, state => {
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchLogout.rejected, state => {
                state.user.status = Status.ERROR
            })
    },
})

export const {} = userSlice.actions
export default userSlice.reducer
