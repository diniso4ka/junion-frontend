export interface IValidationResponseData {
    mail?: string
    password?: string
    confirmPassword?: string
    name?: string
    superCode?: string
}

export interface IRegisterReqData {
    mail: string
    password: string
    confirmPassword?: string
    name: string
    superCode: string
}
export interface ILoginReqData {
    email: string
    password: string
}
