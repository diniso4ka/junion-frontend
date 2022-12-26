import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchProducts = async () => {
    const res = await api.get(endpoints.products.list)
    return res
}

export const fetchFilteredProducts = async (params: string) => {
    const res = await api.get(endpoints.products.filteredList(params))
    return res
}

export const fetchCreateProduct = async data => {
    const res = await api.post(endpoints.products.list, data)
    return res
}
export const fetchUpdateProduct = async data => {
    const res = await api.put(endpoints.products.list, data)
    return res
}
export const fetchDeleteProduct = async id => {
    const res = await api.put(endpoints.products.list, {
        id,
        status: 'deleted',
    })
    return res
}
