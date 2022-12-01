import { AppDispatch, RootState } from './store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { UserSchema } from 'entities/User/model/types/user'
import { LoginSchema } from 'features/AuthByMail/model/types/LoginSchema'
import { RegisterSchema } from 'features/RegisterByMail/model/types/RegisterSchema'
import { ProductsSchema } from 'entities/Products/model/types/ProductsSchema'
import { CategoriesSchema } from 'entities/Categories/model/types/CategoriesSchema'
import { ProductFiltersSchema } from 'features/ProductFilters/model/types/ProductFiltersSchema'

export interface StateSchema {
    user: UserSchema
    products: ProductsSchema
    categories: CategoriesSchema
    productsFilters: ProductFiltersSchema
    loginForm: LoginSchema
    registerForm: RegisterSchema
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
