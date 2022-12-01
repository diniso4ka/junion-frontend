import { AppDispatch, RootState } from './store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { UserSchema } from 'entities/User/model/types/user'
import { LoginSchema } from 'features/AuthByMail/model/types/LoginSchema'
import { RegisterSchema } from 'features/RegisterByMail/model/types/RegisterSchema'
import { ProductsSchema } from 'entities/Products/model/types/ProductsSchema'

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface StateSchema {
    user: UserSchema
    productss: ProductsSchema
    loginForm: LoginSchema
    registerForm: RegisterSchema
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
