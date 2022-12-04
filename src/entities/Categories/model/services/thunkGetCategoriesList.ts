import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCategories } from 'shared/api/requests/categories'
import { categoriesActions } from '../slice/categoriesSlice'

export const thunkGetCategoriesList = createAsyncThunk(
    'categories/CategoriesList',
    async (...args) => {
        try {
            const response = await fetchCategories()
            if (response.data) {
                args[1].dispatch(
                    categoriesActions.setCategories(response.data.data)
                )
                args[1].dispatch(
                    categoriesActions.setQuantity(response.data.quantity)
                )
            }
            return response
        } catch (err) {
            args[1].rejectWithValue(err)
        }
    }
)
