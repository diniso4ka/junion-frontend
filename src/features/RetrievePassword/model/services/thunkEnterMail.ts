import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSendMail } from 'shared/api/requests/retrieve'

export interface thunkEnterMailProps {
    mail: string
}
export const thunkEnterMail = createAsyncThunk(
    'retrieve/EnterEmail',
    async (retrievePasswordData: thunkEnterMailProps, thunkAPI) => {
        try {
            const response = await fetchSendMail(retrievePasswordData)
            if (!response.data) {
                throw new Error()
            }
            return response
        } catch (err) {
            thunkAPI.rejectWithValue(err)
        }
    }
)
