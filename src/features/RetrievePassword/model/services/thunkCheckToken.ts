import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCheckToken } from 'shared/api/requests/user'
import { thunkCheckAuthMe } from 'entities/User'
import { saveTokenInLocalStorage } from 'shared/helpers/localStorage/localStorage'
import { ThunkConfig } from '../../../../app/store/config/StateSchema'

export interface thunkCheckTokenProps {
    verifyToken: string
}

export const thunkCheckToken = createAsyncThunk<
    any,
    thunkCheckTokenProps,
    ThunkConfig<string>
>('retrieve/CheckToken ', async (verificationToken, thunkAPI) => {
    try {
        const response = await fetchCheckToken(verificationToken)
        if (!response.data) {
            throw new Error()
        }
        await saveTokenInLocalStorage(response.data.user.token)
        await thunkAPI.dispatch(thunkCheckAuthMe(0))
        thunkAPI.extra.navigate('/changepass')
        return response
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})
