import { StateSchema } from 'app/store/config/StateSchema'

export const getCategoryList = (state: StateSchema) => state.categories.items
