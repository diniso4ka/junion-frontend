import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user/userSlice'
import products from './slices/products/productsSlice'

export const store = configureStore({
    reducer: {
        user,
        products,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
