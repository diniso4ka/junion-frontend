import { StateSchema } from 'app/store/types'

export const getCategoryList = (state: StateSchema) => state.categories.items
