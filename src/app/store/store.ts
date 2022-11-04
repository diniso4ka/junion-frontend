import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user/userSlice'

export const store = configureStore({
    reducer: {
        user,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
