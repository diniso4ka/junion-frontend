import { createSlice } from '@reduxjs/toolkit'
import {
    thunkFetchCategories,
    thunkFetchFiltredProductList,
    thunkFetchProductList,
    thunkFetchVendors,
} from './thunk'

import { IProductsResData } from 'shared/types/products'
import { Status } from '../../types'
import { ICategoriesResData } from 'shared/types/categories'
import { IVendorsResData } from 'shared/types/vendors'

interface initialStateType {
    data: {
        quantity: number
        items: IProductsResData[]
        categories: ICategoriesResData[]
        vendors: IVendorsResData[]
        filteredItems: [] | null
    }
    status: Status
}

const initialState: initialStateType = {
    data: {
        quantity: 0,
        items: [],
        categories: [],
        vendors: [],
        filteredItems: null,
    },
    status: Status.LOADING,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearFiltredItems(state) {
            state.data.filteredItems = null
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
                    state.data.filteredItems = null
                    state.status = Status.LOADING
                }
            ),
            builder.addCase(
                thunkFetchFiltredProductList.fulfilled,
                (state, action) => {
                    state.data.filteredItems = action.payload.data.result
                    state.status = Status.SUCCESS
                }
            ),
            builder.addCase(
                thunkFetchFiltredProductList.rejected,
                (state, action) => {
                    state.data.filteredItems = null
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
        builder.addCase(thunkFetchVendors.pending, (state, action) => {
            state.data.vendors = []
            state.status = Status.LOADING
        }),
            builder.addCase(thunkFetchVendors.fulfilled, (state, action) => {
                state.data.vendors = [...action.payload.data.data]
                state.status = Status.SUCCESS
            }),
            builder.addCase(thunkFetchVendors.rejected, (state, action) => {
                state.status = Status.ERROR
            })
    },
})

export const { clearFiltredItems } = productsSlice.actions
export default productsSlice.reducer
