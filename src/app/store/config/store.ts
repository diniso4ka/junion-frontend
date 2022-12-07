import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from 'entities/User'
import { productsReducer } from 'entities/Products'
import { categoriesReducer } from 'entities/Categories'
import { productFiltersReducer } from 'features/ProductFilters'
import { vendorsReducer } from 'entities/Vendors'
import { StateSchema } from './StateSchema'
import { createReducerManager } from './reducerManager'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        products: productsReducer,
        categories: categoriesReducer,
        vendors: vendorsReducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        // @ts-ignore
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

const store = createReduxStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
