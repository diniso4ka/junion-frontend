import { createSlice } from '@reduxjs/toolkit'
import { CategoryFiltersSchema } from '../types/CategoryFiltersSchema'
import { createQueryParams } from 'shared/helpers/filters/createQueryParams'

const initialState: CategoryFiltersSchema = {
    filters: {},
    queryString: '',
    isLoading: false,
}
export const categoryFiltersSlice = createSlice({
    name: 'categoryFilters',
    initialState,
    reducers: {
        setFilters(state, action) {
            const params = action.payload
            let filters: any = {}
            for (const i in params) {
                filters = { ...filters, [i]: params[i] }
            }
            state.queryString = createQueryParams(filters)
            state.filters = { ...filters }
        },
        clearFilters(state) {
            state.queryString = ''
            state.filters = {}
        },
    },
})

export const { actions: categoryFiltersActions } = categoryFiltersSlice
export const { reducer: categoryFiltersReducer } = categoryFiltersSlice
