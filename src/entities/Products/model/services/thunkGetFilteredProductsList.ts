import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    fetchFilteredProducts,
    fetchProducts,
} from 'shared/api/requests/products'
import { productsActions } from '../slice/productsSlice'
import { AxiosPromise } from 'axios'
import { ThunkConfig } from '../../../../app/store/config/StateSchema'
import { ProductType } from '../types/ProductsSchema'

interface getProductsResponseType {
    quantity: number
    result: ProductType[]
}

export const thunkGetFilteredProductsList = createAsyncThunk<
    AxiosPromise<getProductsResponseType>,
    string,
    ThunkConfig<string>
>('products/FilteredProductList', async (params, thunkAPI) => {
    try {
        const response = await fetchFilteredProducts(params)
        if (response.data) {
            thunkAPI.dispatch(productsActions.setFilteredProductsList(response))
        }
        return response
    } catch (err) {
        thunkAPI.rejectWithValue(err)
    }
})
