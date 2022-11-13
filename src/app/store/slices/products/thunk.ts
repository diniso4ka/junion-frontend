import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchFiltredProducts,
    fetchProducts,
} from 'shared/api/requests/products'

export const thunkFetchProductList = createAsyncThunk(
    'products/ProductListStatus',
    async () => {
        const res = await fetchProducts()
        return res
    }
)
export const thunkFetchFiltredProductList = createAsyncThunk(
    'products/FiltredProductListStatus',
    async (params: string) => {
        const res = await fetchFiltredProducts(params)
        return res
    }
)
