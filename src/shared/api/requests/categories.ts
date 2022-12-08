import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchCategories = async () => {
    const res = await api.get(endpoints.categories)
    return res
}
