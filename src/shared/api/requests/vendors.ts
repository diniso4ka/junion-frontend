import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchVendors = async () => {
    const res = await api.get(endpoints.products.vendors)
    return res
}
