import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    ProductsSchema,
    ProductSort,
    ProductSortType,
} from '../types/ProductsSchema'
import { thunkFetchProductList } from '../services/thunkGetProductsList'
import { thunkGetFilteredProductsList } from '../services/thunkGetFilteredProductsList'
import { formattedDate } from 'shared/helpers/date/formattedDate'
import { sortByAlphabet } from '../../../../shared/helpers/sort/byAlphabet'

const initialState: ProductsSchema = {
    items: [],
    filteredItems: [],
    sortedItems: [],
    isLoading: false,
    quantity: 0,
    sortedBy: {
        type: null,
        sort: ProductSort.ASC,
    },
}
export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload.data.result
            state.quantity = action.payload.data.qty
        },
        setFilteredProductsList: (state, action) => {
            state.filteredItems = action.payload.data.result
        },
        clearFilteredProductsList: state => {
            state.filteredItems = [...state.items]
        },

        //Сортировка на главной странице
        setSortWithoutCategory: state => {
            state.sortedItems = state.items.filter(
                item => item.category[0] === 'unSorted'
            )
        },
        setSortWithoutPrice: state => {
            state.sortedItems = state.items.filter(item => !item.price)
        },
        setSortAddedToday: state => {
            state.sortedItems = state.items.filter(
                item =>
                    formattedDate() ===
                    item.createdAt.split('').splice(0, 10).join('')
            )
        },
        setSortDeletedToday: state => {
            state.sortedItems = state.sortedItems = state.items.filter(
                item =>
                    item.status === 'deleted' &&
                    formattedDate() ===
                        item.updatedAt.split('').splice(0, 10).join('')
            )
        },

        //Сортировка на Product page
        sortByCode: state => {
            if (state.sortedBy.type === ProductSortType.PRODUCT_CODE) {
                state.sortedBy.sort =
                    state.sortedBy.sort === ProductSort.ASC
                        ? ProductSort.DESC
                        : ProductSort.ASC
            } else {
                state.sortedBy.sort = ProductSort.DESC
                state.sortedBy.type = ProductSortType.PRODUCT_CODE
            }
            if (state.sortedBy.sort === ProductSort.DESC) {
                state.filteredItems = state.filteredItems
                    .sort((a, b) => +a.vendor - +b.vendor)
                    .reverse()
            } else {
                state.filteredItems = state.filteredItems.reverse()
            }
        },
        sortByCategory: state => {
            if (state.sortedBy.type === ProductSortType.PRODUCT_CATEGORY) {
                state.sortedBy.sort =
                    state.sortedBy.sort === ProductSort.ASC
                        ? ProductSort.DESC
                        : ProductSort.ASC
            } else {
                state.sortedBy.sort = ProductSort.DESC
                state.sortedBy.type = ProductSortType.PRODUCT_CATEGORY
            }
            if (state.sortedBy.sort === ProductSort.DESC) {
                state.filteredItems = state.filteredItems
                    .sort((a, b) =>
                        sortByAlphabet(a.category[0], b.category[0])
                    )
                    .reverse()
            } else {
                state.filteredItems = state.filteredItems.reverse()
            }
        },
        sortByName: state => {
            if (state.sortedBy.type === ProductSortType.PRODUCT_NAME) {
                state.sortedBy.sort =
                    state.sortedBy.sort === ProductSort.ASC
                        ? ProductSort.DESC
                        : ProductSort.ASC
            } else {
                state.sortedBy.sort = ProductSort.DESC
                state.sortedBy.type = ProductSortType.PRODUCT_NAME
            }
            if (state.sortedBy.sort === ProductSort.DESC) {
                state.filteredItems = state.filteredItems
                    .sort((a, b) => sortByAlphabet(a.name, b.name))
                    .reverse()
            } else {
                state.filteredItems = state.filteredItems.reverse()
            }
        },
        sortByPrice: state => {
            if (state.sortedBy.type === ProductSortType.PRODUCT_PRICE) {
                state.sortedBy.sort =
                    state.sortedBy.sort === ProductSort.ASC
                        ? ProductSort.DESC
                        : ProductSort.ASC
            } else {
                state.sortedBy.sort = ProductSort.DESC
                state.sortedBy.type = ProductSortType.PRODUCT_PRICE
            }
            if (state.sortedBy.sort === ProductSort.DESC) {
                state.filteredItems = state.filteredItems
                    .sort((a, b) => a.price - b.price)
                    .reverse()
            } else {
                state.filteredItems = state.filteredItems.reverse()
            }
        },
        sortByQuantity: state => {
            if (state.sortedBy.type === ProductSortType.PRODUCT_QUANTITY) {
                state.sortedBy.sort =
                    state.sortedBy.sort === ProductSort.ASC
                        ? ProductSort.DESC
                        : ProductSort.ASC
            } else {
                state.sortedBy.sort = ProductSort.DESC
                state.sortedBy.type = ProductSortType.PRODUCT_QUANTITY
            }
            if (state.sortedBy.sort === ProductSort.DESC) {
                state.filteredItems = state.filteredItems
                    .sort((a, b) => a.quantity - b.quantity)
                    .reverse()
            } else {
                state.filteredItems = state.filteredItems.reverse()
            }
        },
        sortByUnit: state => {
            if (state.sortedBy.type === ProductSortType.PRODUCT_UNIT) {
                state.sortedBy.sort =
                    state.sortedBy.sort === ProductSort.ASC
                        ? ProductSort.DESC
                        : ProductSort.ASC
            } else {
                state.sortedBy.sort = ProductSort.DESC
                state.sortedBy.type = ProductSortType.PRODUCT_UNIT
            }
            if (state.sortedBy.sort === ProductSort.DESC) {
                state.filteredItems = state.filteredItems
                    .sort((a, b) => sortByAlphabet(a.unit, b.unit))
                    .reverse()
            } else {
                state.filteredItems = state.filteredItems.reverse()
            }
        },
        clearSort: state => {
            state.sortedBy = {
                type: null,
                sort: ProductSort.ASC,
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(thunkFetchProductList.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(thunkFetchProductList.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(thunkFetchProductList.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(thunkGetFilteredProductsList.pending, (state, action) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(
                thunkGetFilteredProductsList.fulfilled,
                (state, action) => {
                    state.isLoading = false
                }
            )
            .addCase(thunkGetFilteredProductsList.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
    },
})

export const { actions: productsActions } = productsSlice
export const { reducer: productsReducer } = productsSlice
