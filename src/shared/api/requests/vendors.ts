import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchVendors = async () => {
    const res = await api.get(endpoints.vendors)
    return res
}

export const fetchCreateVendor = async vendorData => {
    const res = await api.post(endpoints.vendors, vendorData)
    return res
}
