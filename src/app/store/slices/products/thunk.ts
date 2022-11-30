import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchCategories,
    fetchCreateProduct,
    fetchFilteredProducts,
    fetchProducts,
    fetchVendors,
} from 'shared/api/requests/products'
import { ICreateProduct } from 'shared/types/createProduct'

export const thunkFetchProductList = createAsyncThunk(
    'products/ProductList',
    async () => {
        const res = await fetchProducts()
        return res
    }
)
export const thunkFetchFilteredProductList = createAsyncThunk(
    'products/FilteredProductList',
    async (params: string) => {
        const res = await fetchFilteredProducts(params)
        return res
    }
)

export const thunkFetchCreateProduct = createAsyncThunk(
    'products/CreateProduct',
    async (data: ICreateProduct) => {
        const res = await fetchCreateProduct(data)
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
