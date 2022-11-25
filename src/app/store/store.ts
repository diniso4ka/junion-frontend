import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user/userSlice'
import products from './slices/products/productsSlice'
import productsFilters from './slices/productsFilters/productsFilters'

export const store = configureStore({
    reducer: {
        user,
        products,
        productsFilters,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
