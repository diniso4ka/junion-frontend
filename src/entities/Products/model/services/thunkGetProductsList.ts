import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts } from 'shared/api/requests/products'
import { productsActions } from '../slice/productsSlice'
import { AxiosPromise } from 'axios'
import { ProductType } from '../types/ProductsSchema'
import { ThunkConfig } from '../../../../app/store/config/StateSchema'

interface getProductsResponseType {
    quantity: number
    result: ProductType[]
}

export const thunkFetchProductList = createAsyncThunk<
    AxiosPromise<getProductsResponseType>,
    void,
    ThunkConfig<string>
>('products/ProductList', async (_, thunkAPI) => {
    try {
        const response = await fetchProducts()
        if (response.data) {
            thunkAPI.dispatch(productsActions.setProducts(response))
        }
        return response
    } catch (err) {
        thunkAPI.rejectWithValue(err)
    }
})
