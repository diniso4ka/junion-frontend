import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from '../../../../shared/api/requests/products'

export const thunkFetchProductList = createAsyncThunk(
    'products/ProductListStatus',
    async () => {
        const res = await fetchProducts()
        return res
    }
)
