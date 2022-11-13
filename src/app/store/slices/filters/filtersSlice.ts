import { createSlice } from '@reduxjs/toolkit'
import { IProductsFilter } from 'shared/types/filters'

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
            state.filters = action.payload
        },
    },
})

export const { setFilters } = filtersSlice.actions
export default filtersSlice.reducer
