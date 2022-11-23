import { Status } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import {
    thunkFetchCategories,
    thunkFetchFiltredProductList,
    thunkFetchProductList,
} from './thunk'
import { IProductsResData } from 'shared/types/products'
import { stat } from 'fs'

interface initialStateType {
    data: {
        quantity: number
        items: IProductsResData[]
        categories: string[]
        filtredItems: [] | null
    }
    status: Status
}

const initialState: initialStateType = {
    data: {
        quantity: 0,
        items: [],
        categories: [],
        filtredItems: null,
    },
    status: Status.LOADING,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearFiltredItems(state) {
            state.data.filtredItems = null
        },
    },
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
                    state.data.filtredItems = null
                    state.status = Status.LOADING
                }
            ),
            builder.addCase(
                thunkFetchFiltredProductList.fulfilled,
                (state, action) => {
                    state.data.filtredItems = action.payload.data.result
                    state.status = Status.SUCCESS
                }
            ),
            builder.addCase(
                thunkFetchFiltredProductList.rejected,
                (state, action) => {
                    state.data.filtredItems = null
                    state.status = Status.ERROR
                }
            ),
            builder.addCase(thunkFetchCategories.pending, (state, action) => {
                state.data.categories = null
                state.status = Status.LOADING
            }),
            builder.addCase(thunkFetchCategories.fulfilled, (state, action) => {
                state.data.categories = action.payload.data.data
                state.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchCategories.rejected, (state, action) => {
                state.data.categories = null
                state.status = Status.ERROR
            })
    },
})

export const { clearFiltredItems } = productsSlice.actions
export default productsSlice.reducer
