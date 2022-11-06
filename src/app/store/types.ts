import { AppDispatch, RootState } from './store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector