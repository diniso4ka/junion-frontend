export { getCategoryList } from './model/selectors/getCategoryList/getCategoryList'
export { getCategoryStatus } from './model/selectors/getCategoryStatus/getCategoryStatus'
export { getCategoryState } from './model/selectors/getCategoryState/getCategoryState'
export { getCategoryQuantity } from './model/selectors/getCategoryQuantity/getCategoryQuantity'
export { getCategoryFilteredList } from './model/selectors/getCategoryFilteredList/getCategoryFilteredList'
export { getCategorySortedBy } from './model/selectors/getCategorySortedBy/getCategorySortedBy'

export { thunkGetCategoriesList } from './model/services/thunkGetCategoriesList'

export {
    categoriesActions,
    categoriesReducer,
} from './model/slice/categoriesSlice'
