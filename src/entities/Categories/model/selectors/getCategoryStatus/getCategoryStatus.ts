import { StateSchema } from 'app/store/types'

export const getCategoryStatus = (state: StateSchema) =>
    state.categories.isLoading
