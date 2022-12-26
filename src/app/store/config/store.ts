import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from 'entities/User'
import { productsReducer } from 'entities/Products'
import { categoriesReducer } from 'entities/Categories'
import { vendorsReducer } from 'entities/Vendors'
import { StateSchema, ThunkExtraArg } from './StateSchema'
import { createReducerManager } from './reducerManager'
import { To } from '@remix-run/router/history'
import { NavigateOptions } from 'react-router'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        products: productsReducer,
        categories: categoriesReducer,
        vendors: vendorsReducer,
    }

    const reducerManager = createReducerManager(rootReducers)

    const extraArgs: ThunkExtraArg = {
        navigate,
    }

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        // @ts-ignore
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
                thunk: {
                    extraArgument: extraArgs,
                },
            }),
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type RootState = ReturnType<typeof createReduxStore>['getState']
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
