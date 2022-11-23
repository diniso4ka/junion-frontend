import { createSlice } from '@reduxjs/toolkit'

import { Status } from '../../types'
import { IUserData } from 'shared/types/user'

import { saveTokenInLocalStorage } from 'shared/helpers/localStorage/localStorage'
import {
    mailValidationMessages,
    passwordValidationMessages,
} from 'shared/helpers/validations/messages'
import {
    thunkFetchAuthMe,
    thunkFetchLogin,
    thunkFetchLogout,
    thunkFetchRegister,
} from './thunk'
import { TOKEN_KEY } from '../../../../shared/config/config/consts'

interface initialStateType {
    user: {
        data: IUserData | null
        status: Status
        auth: boolean
    }
    errors: {
        incorrect: string | null
        wrongSuperCode: boolean
        emailAlready: string | null
    }
    initialize: boolean
}

const initialState: initialStateType = {
    user: {
        data: null,
        status: Status.LOADING,
        auth: false,
    },
    errors: {
        incorrect: null,
        wrongSuperCode: false,
        emailAlready: null,
    },
    initialize: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Регистрация
        builder.addCase(thunkFetchRegister.pending, (state, action) => {
            state.user.status = Status.LOADING
        }),
            builder.addCase(thunkFetchRegister.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload.data.user.token) {
                    saveTokenInLocalStorage(action.payload.data.user.token)
                } else if (action.payload) {
                    state.errors.wrongSuperCode = true
                    state.user.status = Status.SUCCESS
                }
                state.user.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchRegister.rejected, (state, action) => {
                //@ts-ignore
                const message = action.payload?.message
                if (message.includes('super')) {
                    state.errors.wrongSuperCode = true
                    state.user.status = Status.ERROR
                } else if (message.includes('email')) {
                    state.errors.emailAlready = mailValidationMessages.already
                    state.user.status = Status.ERROR
                }
                state.user.status = Status.ERROR
            }),
            // Логин
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
            // Проверка токена
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
                    state.user.auth = true
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
            // Выход
            builder.addCase(thunkFetchLogout.pending, state => {
                state.user.data = null
                state.user.auth = false
                window.localStorage.removeItem(TOKEN_KEY)
            }),
            builder.addCase(thunkFetchLogout.fulfilled, state => {
                state.user.auth = false
            }),
            builder.addCase(thunkFetchLogout.rejected, state => {
                state.user.auth = false
            })
    },
})

export const {} = userSlice.actions
export default userSlice.reducer
