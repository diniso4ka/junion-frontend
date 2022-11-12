import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchProducts = async () => {
    const res = await api.get(endpoints.products.list)
    return res
}
