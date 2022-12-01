import { createSlice } from '@reduxjs/toolkit'
import {
    thunkFetchCategories,
    thunkFetchCreateProduct,
    thunkFetchFilteredProductList,
    thunkFetchProductList,
    thunkFetchVendors,
} from './thunk'

import { Status } from '../../types'
import { ICategoriesResData } from 'shared/types/categories'
import { IVendorsResData } from 'shared/types/vendors'

interface initialStateType {
    data: {
        categories: ICategoriesResData[]
        vendors: IVendorsResData[]
        filteredItems: [] | null
    }
    status: Status
}

const initialState: initialStateType = {
    data: {
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
            }),
            builder.addCase(
                thunkFetchCreateProduct.pending,
                (state, action) => {
                    state.status = Status.LOADING
                }
            ),
            builder.addCase(
                thunkFetchCreateProduct.fulfilled,
                (state, action) => {
                    console.log(action.payload)
                    state.status = Status.SUCCESS
                }
            ),
            builder.addCase(
                thunkFetchCreateProduct.rejected,
                (state, action) => {
                    state.status = Status.ERROR
                }
            )
    },
})

export const { clearFiltredItems } = productsSlice.actions
export default productsSlice.reducer
