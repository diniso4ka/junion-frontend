import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUpdateProduct } from 'shared/api/requests/products'
import { productsActions } from '../../../../entities/Products'

export interface UpdateProductProps {
    name: string
    price: number
    quantity: number
    unit: string
    category: string
    discountPrice?: number
    vendor: string
    id: string
}

export const thunkUpdateProduct = createAsyncThunk(
    'products/UpdateProducts',
    async (productData: UpdateProductProps, thunkAPI) => {
        try {
            const response = await fetchUpdateProduct(productData)
            if (!response.data) {
                throw new Error()
            }
            // @ts-ignore
            thunkAPI.dispatch(productsActions.updateProduct(response)) //TODO RESPONSE TYPE
            return response
        } catch (err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)
