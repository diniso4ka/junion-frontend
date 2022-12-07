import { AppDispatch, RootState } from './store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { UserSchema } from 'entities/User/model/types/user'
import { LoginSchema } from 'features/AuthByMail/model/types/LoginSchema'
import { RegisterSchema } from 'features/RegisterByMail/model/types/RegisterSchema'
import { ProductsSchema } from 'entities/Products/model/types/ProductsSchema'
import { CategoriesSchema } from 'entities/Categories/model/types/CategoriesSchema'
import { ProductFiltersSchema } from 'features/ProductFilters/model/types/ProductFiltersSchema'
import { VendorsSchema } from 'entities/Vendors/model/types/VendorsSchema'
import { CreateProductSchema } from 'features/CreateProduct/model/types/CreateProductSchema'
import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { CombinedState } from 'redux'

export interface StateSchema {
    user: UserSchema
    products: ProductsSchema
    categories: CategoriesSchema
    vendors: VendorsSchema

    // Ассинхронные редюсеры
    loginForm?: LoginSchema
    registerForm?: RegisterSchema
    createProduct?: CreateProductSchema
    productsFilters?: ProductFiltersSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
