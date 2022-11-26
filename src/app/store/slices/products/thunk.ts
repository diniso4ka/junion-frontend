import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchCategories,
    fetchFiltredProducts,
    fetchProducts,
    fetchVendors,
} from 'shared/api/requests/products'

export const thunkFetchProductList = createAsyncThunk(
    'products/ProductList',
    async () => {
        const res = await fetchProducts()
        return res
    }
)
export const thunkFetchFiltredProductList = createAsyncThunk(
    'products/FiltredProductList',
    async (params: string) => {
        const res = await fetchFiltredProducts(params)
        return res
    }
)
export const thunkFetchCategories = createAsyncThunk(
    'products/CategoriesList',
    async () => {
        const res = await fetchCategories()
        return res
    }
)
export const thunkFetchVendors = createAsyncThunk(
    'products/VendorsList',
    async () => {
        const res = await fetchVendors()
        return res
    }
)
