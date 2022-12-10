import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchChangePassword } from 'shared/api/requests/user'

export interface thunkChangePasswordProps {
    password: string
}
export const thunkChangePassword = createAsyncThunk(
    'user/ChangePassword',
    async (retrievePasswordData: thunkChangePasswordProps, thunkAPI) => {
        try {
            const response = await fetchChangePassword(retrievePasswordData)
            if (!response.data) {
                throw new Error()
            }
            console.log(response)
            return response
        } catch (err) {
            thunkAPI.rejectWithValue(err)
        }
    }
)
