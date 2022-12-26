export { getProductsQuantity } from './model/selectors/getProductsQuantity/getProductsQuantity'
export { getProductsList } from './model/selectors/getProductsList/getProductsList'
export { getProductsStatus } from './model/selectors/getProductsStatus/getProductsStatus'
export { getProductsState } from './model/selectors/getProductsState/getProductsState'
export { getProductsFilteredList } from './model/selectors/getProductsFilteredList/getProductsFilteredList'

export { productsActions, productsReducer } from './model/slice/productsSlice'
export { thunkFetchProductList } from './model/services/thunkGetProductsList'
export { thunkGetFilteredProductsList } from './model/services/thunkGetFilteredProductsList'

export { ProductsTable } from './ui/ProductsTable/ProductsTable'
