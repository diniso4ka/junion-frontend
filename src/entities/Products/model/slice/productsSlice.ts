import { createSlice } from '@reduxjs/toolkit'
import { ProductsSchema } from '../types/ProductsSchema'
import { thunkFetchProductList } from '../services/thunkGetProductsList'
import { thunkGetFilteredProductsList } from '../services/thunkGetFilteredProductsList'
import { formattedDate } from 'shared/helpers/date/formattedDate'

const initialState: ProductsSchema = {
    items: [],
    filteredItems: [],
    sortedItems: [],
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
        setSortWithoutCategory: state => {
            state.sortedItems = state.items.filter(
                item => item.category[0] === 'unSorted'
            )
        },
        setSortWithoutPrice: state => {
            state.sortedItems = state.items.filter(item => !item.price)
        },
        setSortAddedToday: state => {
            state.sortedItems = state.items.filter(
                item =>
                    formattedDate() ===
                    item.createdAt.split('').splice(0, 10).join('')
            )
        },
        setSortDeletedToday: state => {
            state.sortedItems = state.sortedItems = state.items.filter(
                item =>
                    item.status === 'deleted' &&
                    formattedDate() ===
                        item.updatedAt.split('').splice(0, 10).join('')
            )
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
