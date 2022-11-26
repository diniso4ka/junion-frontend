import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchProducts = async () => {
    const res = await api.get(endpoints.products.list)
    return res
}
export const fetchFiltredProducts = async (params: string) => {
    const res = await api.get(endpoints.products.filtredList(params))
    return res
}

export const fetchCategories = async () => {
    const res = await api.get(endpoints.products.categories)
    return res
}

export const fetchVendors = async () => {
    const res = await api.get(endpoints.products.vendors)
    return res
}
