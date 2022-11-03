import { ILoginReqData, IRegisterReqData } from '../helpers/validations/types'
import { api } from './instance'
import { endpoints } from './endpoints'

export const fetchRegister = async (data: IRegisterReqData) => {
    const res = await api.post(endpoints.users.register, {
        ...data,
        superCode: 7777,
    })
    return res
}
export const fetchLogin = async (data: ILoginReqData) => {
    const res = await api.post(endpoints.users.login, {
        ...data,
    })
    return res
}
