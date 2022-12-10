import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCheckToken } from 'shared/api/requests/user'
import { thunkCheckAuthMe } from 'entities/User'
import { saveTokenInLocalStorage } from 'shared/helpers/localStorage/localStorage'

export type thunkEnterMailProps = string

export const thunkCheckToken = createAsyncThunk(
    'retrieve/CheckToken ',
    async (token: thunkEnterMailProps, thunkAPI) => {
        try {
            const response = await fetchCheckToken(token)
            if (!response.data) {
                throw new Error()
            }
            await saveTokenInLocalStorage(response.data.user.token)
            thunkAPI.dispatch(thunkCheckAuthMe(0))
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
