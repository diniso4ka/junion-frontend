import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchFilteredProducts,
    fetchProducts,
} from 'shared/api/requests/products'
import { productsActions } from '../slice/productsSlice'

export const thunkFetchProductList = createAsyncThunk(
    'products/FilteredProductList',
    async (params: string, thunkAPI) => {
        try {
            const response = await fetchFilteredProducts(params)
            if (response.data) {
                thunkAPI.dispatch(
                    productsActions.setFilteredProductsList(response)
                )
            }
            return response
        } catch (err) {
            thunkAPI.rejectWithValue(err)
        }
    }
)
