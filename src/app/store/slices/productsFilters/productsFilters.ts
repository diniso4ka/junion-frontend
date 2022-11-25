import { Categories, Status } from '../../types'
import { createSlice } from '@reduxjs/toolkit'
import { IProductsFilter } from 'shared/types/filters'
import {
    convertQueryParamsInObj,
    createQueryParams,
} from 'shared/helpers/filters/createQueryParams'

interface initialStateType {
    filters: IProductsFilter | null
    queryString: string
}

const initialState: initialStateType = {
    filters: null,
    queryString: '',
}

const productsFiltersSlice = createSlice({
    name: 'productsFilters',
    initialState,
    reducers: {
        setFilters(state, action) {
            const params = action.payload
            let filters: any = {}
            for (const i in params) {
                if (params[i].length > 0) {
                    filters = { ...filters, [i]: params[i] }
                }
            }
            state.queryString = createQueryParams(filters)
            state.filters = { ...filters }
        },
        setQueryString(state, action) {
            const params = convertQueryParamsInObj(action.payload)
            let filters: any = {}
            for (const i in params) {
                if (params[i].length > 0) {
                    filters = { ...filters, [i]: params[i] }
                }
            }
            state.queryString = createQueryParams(filters)
            state.filters = { ...filters }
        },
        clearFilters(state) {
            state.queryString = ''
            state.filters = null
        },
    },
})

export const { setFilters, setQueryString, clearFilters } =
    productsFiltersSlice.actions
export default productsFiltersSlice.reducer
