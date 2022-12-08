import api from '../instance'
import { endpoints } from '../endpoints'

export const fetchSendMail = async data => {
    const res = await api.post(endpoints.password, data)
    return res
}
export const fetchChangePassword = async data => {
    const res = await api.post(endpoints.password, data)
    return res
}
