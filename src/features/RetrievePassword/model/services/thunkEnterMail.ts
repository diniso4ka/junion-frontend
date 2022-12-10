import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSendMail } from 'shared/api/requests/user'

export type thunkEnterMailProps = string

export const thunkEnterMail = createAsyncThunk(
    'retrieve/EnterEmail',
    async (mail: thunkEnterMailProps, thunkAPI) => {
        try {
            const response = await fetchSendMail(mail)
            // @ts-ignore
            if (!response.status === 200) {
                throw new Error()
            }
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
