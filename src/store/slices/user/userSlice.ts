import { Status } from '../../types'
import { IUserData } from './types'
import { createSlice } from '@reduxjs/toolkit'

interface initialStateType {
    user: {
        data: IUserData | null
        status: Status
    }
}

const initialState: initialStateType = {
    user: {
        data: null,
        status: Status.LOADING,
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
})

export const {} = userSlice.actions
export default userSlice.reducer
