import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchProducts = async () => {
    const res = await api.get(endpoints.products.list)
    return res
}

export const fetchFilteredProducts = async (params: string) => {
    const res = await api.get(endpoints.products.filtredList(params))
    return res
}

export const fetchCreateProduct = async data => {
    const res = await api.post(endpoints.products.list, data)
    return res
}
