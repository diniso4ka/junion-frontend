import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAuthMe } from 'shared/api/requests/user'
import { userActions } from '../slice/userSlice'
import { ThunkConfig } from '../../../../app/store/config/StateSchema'
import { User } from '../types/user'
import { AxiosPromise } from 'axios'

export const thunkCheckAuthMe = createAsyncThunk<
    AxiosPromise<User>,
    void,
    ThunkConfig<string>
>('user/checkAuthMe', async (_, thunkAPI) => {
    const response = await fetchAuthMe()
    thunkAPI.dispatch(userActions.setAuthData(response.data.user))
    return response
})
