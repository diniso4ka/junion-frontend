import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchProducts = async () => {
    const res = await api.get(endpoints.products.list)
    return res
}
export const fetchFiltredProducts = async params => {
    const res = await api.get(endpoints.products.filtredList(params))
    return res
}
