import { ILoginReqData, IRegisterReqData } from '../helpers/validations/types'
import api from './instance'
import { endpoints } from './endpoints'

export const fetchRegister = async (data: IRegisterReqData) => {
    try {
        const res = await api.post(endpoints.users.register, {
            ...data,
        })
        return res
    } catch (err) {
        return err
    }
}
export const fetchLogin = async (data: ILoginReqData) => {
    const res = await api.post(endpoints.users.login, {
        ...data,
    })
    return res
}

export const fetchLogout = async () => {
    const res = await api.post(endpoints.users.logout)
    return res
}

export const fetchAuthMe = async () => {
    const res = await api.get(endpoints.users.me)
    return res
}
