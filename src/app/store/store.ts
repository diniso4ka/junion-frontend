import { configureStore } from '@reduxjs/toolkit'
import { loginReducer } from 'features/AuthByMail'
import { userReducer } from 'entities/User'
import { registerReducer } from 'features/RegisterByMail'
import { productsReducer } from 'entities/Products'
import { categoriesReducer } from 'entities/Categories'
import { productFiltersReducer } from 'features/ProductFilters'

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        categories: categoriesReducer,
        productsFilters: productFiltersReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
