import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user/userSlice'
import productsSlice from './slices/products/productsSlice'

export const store = configureStore({
    reducer: {
        user,
        productsSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
