import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAuthMe } from 'shared/api/requests/user'
import { userActions } from '../slice/userSlice'

export const thunkCheckAuthMe = createAsyncThunk(
    'user/checkAuthMe',
    async (arg: number, thunkAPI) => {
        const response = await fetchAuthMe()
        thunkAPI.dispatch(userActions.setAuthData(response.data.user))
        return response
    }
)
