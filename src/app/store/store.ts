import { configureStore } from '@reduxjs/toolkit'
import products from './slices/products/productsSlice'
import productsFilters from './slices/productsFilters/productsFilters'
import { loginReducer } from 'features/AuthByMail'
import { userReducer } from 'entities/User'
import { registerReducer } from 'features/RegisterByMail'
import { productsReducer } from '../../entities/Products/model/slice/productsSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        productss: productsReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
        productsFilters,
        products,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
