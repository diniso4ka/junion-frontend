import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UpdateProductSchema } from '../types/UpdateProductSchema'
import { thunkUpdateProduct } from '../services/thunkUpdateProduct'
import { ProductType } from 'entities/Products/model/types/ProductsSchema'
import { discountConvertInPercent } from 'shared/helpers/math/discountPrice'
import { thunkDeleteProduct } from '../services/thunkDeleteProduct'

const initialState: UpdateProductSchema = {
    form: {
        name: '',
        category: '',
        price: '',
        quantity: '',
        status: '',
        discountPrice: '',
        unit: '',
        vendor: '',
        _id: '',
    },
    selectedItems: [],
    isLoading: false,
}

export const updateProductSlice = createSlice({
    name: 'updateProduct',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.form.name = action.payload
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.form.category = action.payload
        },
        setPrice: (state, action: PayloadAction<string>) => {
            if (!isNaN(+action.payload)) {
                state.form.price = action.payload
            }
        },
        setQuantity: (state, action: PayloadAction<string>) => {
            if (!isNaN(+action.payload)) {
                state.form.quantity = action.payload
            }
        },
        setDiscountPrice: (state, action: PayloadAction<string>) => {
            if (!isNaN(+action.payload)) {
                state.form.discountPrice = action.payload
            }
        },
        setUnit: (state, action: PayloadAction<string>) => {
            state.form.unit = action.payload
        },
        setVendor: (state, action: PayloadAction<string>) => {
            state.form.vendor = action.payload
        },
        setValues: (state, action: PayloadAction<ProductType>) => {
            state.form = {
                name: action.payload.name || '',
                category: action.payload.category.join(', '),
                price: action.payload.price.toString() || '',
                quantity: action.payload.quantity.toString() || '',
                status: action.payload.status || '',
                discountPrice:
                    (action.payload.discountPrice &&
                        discountConvertInPercent(
                            action.payload.price,
                            action.payload.discountPrice
                        ).toString()) ||
                    null,
                unit: action.payload.unit || '',
                vendor: action.payload.vendor || '',
                _id: action.payload._id || '',
            }
        },
        selectProduct: (state, action: PayloadAction<ProductType>) => {
            if (
                state.selectedItems.find(
                    product => product._id === action.payload._id
                )
            ) {
                state.selectedItems = state.selectedItems.filter(
                    product => product._id !== action.payload._id
                )
            } else {
                state.selectedItems = [...state.selectedItems, action.payload]
            }
        },
        clearSelect: state => {
            state.selectedItems = []
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkUpdateProduct.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(thunkUpdateProduct.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(thunkUpdateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(thunkDeleteProduct.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(thunkDeleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(thunkDeleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
    },
})

export const { actions: updateProductActions } = updateProductSlice
export const { reducer: updateProductReducer } = updateProductSlice
