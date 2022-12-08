import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchChangePassword } from 'shared/api/requests/retrieve'

export interface thunkChangePasswordProps {
    password: string
}
export const thunkChangePassword = createAsyncThunk(
    'retrieve/EnterEmail',
    async (retrievePasswordData: thunkChangePasswordProps, thunkAPI) => {
        try {
            const response = await fetchChangePassword(retrievePasswordData)
            if (!response.data) {
                throw new Error()
            }
            return response
        } catch (err) {
            thunkAPI.rejectWithValue(err)
        }
    }
)
