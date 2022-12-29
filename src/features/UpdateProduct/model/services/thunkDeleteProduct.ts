import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDeleteProduct } from 'shared/api/requests/products'
import { updateProductActions } from '../slice/updateProductSlice'
import { productsActions } from '../../../../entities/Products'

export type DeleteProductProps = string

export const thunkDeleteProduct = createAsyncThunk(
    'products/DeleteProducts',
    async (productData: DeleteProductProps, thunkAPI) => {
        try {
            const response = await fetchDeleteProduct(productData)
            if (!response.data) {
                throw new Error()
            }
            thunkAPI.dispatch(updateProductActions.clearSelect())
            thunkAPI.dispatch(productsActions.deleteProduct(productData))
            return response
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)
