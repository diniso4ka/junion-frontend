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

export interface StateSchema {
    user: UserSchema
    products: ProductsSchema
    categories: CategoriesSchema
    vendors: VendorsSchema
    productsFilters: ProductFiltersSchema
    loginForm: LoginSchema
    registerForm: RegisterSchema
    createProduct: CreateProductSchema
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
