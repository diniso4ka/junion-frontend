import { StateSchema } from 'app/store/types'

export const getCategoryQuantity = (state: StateSchema) =>
    state.categories.quantity
