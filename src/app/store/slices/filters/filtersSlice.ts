import { createSlice } from '@reduxjs/toolkit'
import { IProductsFilter } from 'shared/types/filters'
import { createQueryParams } from 'shared/helpers/filters/createQueryParams'

interface initialStateType {
    filters: IProductsFilter
    queryParams: string
}

const initialState: initialStateType = {
    filters: {},
    queryParams: '',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action) {
            let filters: any = {}
            for (const i in action.payload) {
                if (action.payload[i].length > 0) {
                    filters = { ...filters, [i]: action.payload[i] }
                }
            }
            state.filters = { ...filters }
            state.queryParams = createQueryParams(filters)
        },
        clearFilters(state) {
            state.filters = {}
            state.queryParams = ''
        },
    },
})

export const { setFilters, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer
