import api from '../instance'
import { endpoints } from '../endpoints'
import { LoginByMailProps } from 'features/AuthByMail/model/services/LoginByMail'
import { RegisterByMailProps } from 'features/RegisterByMail/model/services/RegisterByMail'

export const fetchRegister = async (data: RegisterByMailProps) => {
    const res = await api.post(endpoints.users.register, data)
    return res
}
export const fetchLogin = async (data: LoginByMailProps) => {
    const res = await api.post(endpoints.users.login, data)
    return res
}
export const fetchLogout = async () => {
    const res = await api.get(endpoints.users.logout)
    return res
}

export const fetchAuthMe = async () => {
    const res = await api.get(endpoints.users.me)
    return res
}
