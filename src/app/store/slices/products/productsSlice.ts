import { Status } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import { thunkFetchFiltredProductList, thunkFetchProductList } from './thunk'
import { IProductsResData } from 'shared/types/products'

interface initialStateType {
    data: {
        quantity: number
        items: IProductsResData[]
    }
    status: Status
}

const initialState: initialStateType = {
    data: {
        quantity: 0,
        items: [],
    },
    status: Status.LOADING,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(thunkFetchProductList.pending, (state, action) => {
            state.data.items = []
            state.status = Status.LOADING
        }),
            builder.addCase(
                thunkFetchProductList.fulfilled,
                (state, action) => {
                    state.data.items = action.payload.data.result
                    state.data.quantity = action.payload.data.qty
                    state.status = Status.SUCCESS
                }
            ),
            builder.addCase(thunkFetchProductList.rejected, (state, action) => {
                state.data.items = []
                state.status = Status.ERROR
            }),
            builder.addCase(
                thunkFetchFiltredProductList.pending,
                (state, action) => {
                    state.data.items = []
                    state.status = Status.LOADING
                }
            ),
            builder.addCase(
                thunkFetchFiltredProductList.fulfilled,
                (state, action) => {
                    state.data.items = action.payload.data.result
                    state.status = Status.SUCCESS
                }
            ),
            builder.addCase(
                thunkFetchFiltredProductList.rejected,
                (state, action) => {
                    state.data.items = []
                    state.status = Status.ERROR
                }
            )
    },
})

export const {} = productsSlice.actions
export default productsSlice.reducer
