import { createSlice } from '@reduxjs/toolkit'
import { ProductsSchema } from '../types/ProductsSchema'
import { thunkFetchProductList } from '../services/thunkGetProductsList'
import { thunkFetchFilteredProductList } from '../../../../app/store/slices/products/thunk'

const initialState: ProductsSchema = {
    isLoading: false,
    quantity: 0,
}
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload.data.result
            state.quantity = action.payload.data.qty
        },
        setFilteredProductsList: (state, action) => {
            state.items = action.payload.data.result
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkFetchProductList.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(thunkFetchProductList.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(thunkFetchProductList.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(thunkFetchFilteredProductList.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(
                thunkFetchFilteredProductList.fulfilled,
                (state, action) => {
                    state.isLoading = false
                }
            )
            .addCase(
                thunkFetchFilteredProductList.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = true
                }
            )
    },
})

export const { actions: productsActions } = productsSlice
export const { reducer: productsReducer } = productsSlice
