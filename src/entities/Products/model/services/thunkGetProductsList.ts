import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from 'shared/api/requests/products'
import { productsActions } from '../slice/productsSlice'

export const thunkFetchProductList = createAsyncThunk(
    'products/ProductList',
    async (...args) => {
        try {
            const response = await fetchProducts()
            if (response.data) {
                args[1].dispatch(productsActions.setProducts(response))
            }
            return response
        } catch (err) {
            args[1].rejectWithValue(err)
        }
    }
)
