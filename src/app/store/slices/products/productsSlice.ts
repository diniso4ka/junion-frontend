import { Status } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import { thunkFetchProductList } from './thunk'
import { IProductsResData } from 'shared/types/products'

interface initialStateType {
    products: IProductsResData[]
    status: Status
}

const initialState: initialStateType = {
    products: [],
    status: Status.LOADING,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(thunkFetchProductList.pending, (state, action) => {
            state.products = []
            state.status = Status.LOADING
        }),
            builder.addCase(
                thunkFetchProductList.fulfilled,
                (state, action) => {
                    state.products = action.payload.data
                    state.status = Status.SUCCESS
                }
            ),
            builder.addCase(thunkFetchProductList.rejected, (state, action) => {
                state.products = []
                state.status = Status.ERROR
            })
    },
})

export const {} = productsSlice.actions
export default productsSlice.reducer
