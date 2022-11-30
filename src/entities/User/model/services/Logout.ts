import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchLogout } from 'shared/api/requests/user'
import { USER_LOCALSTORAGE_TOKEN } from 'shared/consts/localStorage'

export const thunkLogout = createAsyncThunk(
    'user/logout',
    async (arg: number, thunkAPI) => {
        try {
            const response = await fetchLogout()
            localStorage.removeItem(USER_LOCALSTORAGE_TOKEN)
            return response
        } catch (err) {
            thunkAPI.rejectWithValue(err)
        }
    }
)
