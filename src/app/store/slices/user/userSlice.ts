import { createSlice } from '@reduxjs/toolkit'

import { Status } from '../../types'
import { IUserData } from 'shared/types/user'

import { saveTokenInLocalStorage } from 'shared/helpers/localStorage/localStorage'
import { passwordValidationMessages } from 'shared/helpers/validations/messages'
import {
    thunkFetchAuthMe,
    thunkFetchLogin,
    thunkFetchLogout,
    thunkFetchRegister,
} from './thunk'

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
                if (action.payload.data.user.token) {
                    saveTokenInLocalStorage(action.payload.data.user.token)
                } else if (action.payload) {
                    console.log(action.payload)
                    state.errors.wrongSuperCode = true
                    state.user.status = Status.SUCCESS
                }
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchRegister.rejected, (state, action) => {
                //@ts-ignore
                if (action.payload.message.includes('super')) {
                    state.errors.wrongSuperCode = true
                    state.user.status = Status.ERROR
                }
                state.user.status = Status.ERROR
            }),
            builder.addCase(thunkFetchLogin.pending, (state, action) => {
                state.errors.incorrect = null
                state.user.status = Status.LOADING
            }),
            builder.addCase(thunkFetchLogin.fulfilled, (state, action) => {
                state.errors.incorrect = null
                if (!!action.payload.data.token) {
                    saveTokenInLocalStorage(action.payload.data.token)
                    state.user.status = Status.SUCCESS
                }
            }),
            builder.addCase(thunkFetchLogin.rejected, state => {
                state.errors.incorrect = passwordValidationMessages.incorrect
                state.user.status = Status.ERROR
            }),
            builder.addCase(thunkFetchAuthMe.pending, state => {
                state.user.data = null
                state.user.status = Status.LOADING
            }),
            builder.addCase(thunkFetchAuthMe.fulfilled, (state, action) => {
                if (!state.initialize) {
                    state.initialize = true
                }
                if (action.payload.data) {
                    state.user.data = action.payload.data.user
                }
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchAuthMe.rejected, state => {
                if (!state.initialize) {
                    state.initialize = true
                }
                state.user.data = null
                state.user.status = Status.ERROR
            }),
            builder.addCase(thunkFetchLogout.pending, state => {
                state.user.data = null
                window.localStorage.removeItem('token')
            }),
            builder.addCase(thunkFetchLogout.fulfilled, state => {}),
            builder.addCase(thunkFetchLogout.rejected, state => {})
    },
})

export const {} = userSlice.actions
export default userSlice.reducer
