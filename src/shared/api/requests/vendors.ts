import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchVendors = async () => {
    const res = await api.get(endpoints.products.vendors)
    return res
}

export const fetchCreateVendor = async vendorData => {
    const res = await api.post(endpoints.products.vendors, vendorData)
    return res
}
