import { createSlice } from '@reduxjs/toolkit'
import { ProductsSchema } from '../types/ProductsSchema'
import { thunkFetchProductList } from '../services/thunkGetProductsList'
import { thunkGetFilteredProductsList } from '../services/thunkGetFilteredProductsList'

const initialState: ProductsSchema = {
    items: [],
    filteredItems: [],
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
            state.filteredItems = action.payload.data.result
        },
        clearFilteredProductsList: state => {
            state.filteredItems = []
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
            .addCase(thunkGetFilteredProductsList.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(
                thunkGetFilteredProductsList.fulfilled,
                (state, action) => {
                    state.isLoading = false
                }
            )
            .addCase(thunkGetFilteredProductsList.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
    },
})

export const { actions: productsActions } = productsSlice
export const { reducer: productsReducer } = productsSlice
