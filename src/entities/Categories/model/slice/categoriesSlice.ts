import { createSlice } from '@reduxjs/toolkit'
import { CategoriesSchema } from '../types/CategoriesSchema'
import { thunkGetCategoriesList } from '../services/thunkGetCategoriesList'

const initialState: CategoriesSchema = {
    items: [],
    quantity: 0,
    isLoading: false,
}
export const categoriesSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.items = action.payload
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkGetCategoriesList.pending, state => {
                state.isLoading = true
                state.error = false
            })
            .addCase(thunkGetCategoriesList.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(thunkGetCategoriesList.rejected, state => {
                state.isLoading = false
                state.error = true
            })
    },
})

export const { actions: categoriesActions } = categoriesSlice
export const { reducer: categoriesReducer } = categoriesSlice
