export interface IValidationResponseData {
    email?: string
    password?: string
    correctPassword?: string
    name?: string
    superCode?: string
}

export interface IRegisterReqData {
    email: string
    password: string
    correctPassword?: string
    name: string
    superCode: string
}
export interface ILoginReqData {
    email: string
    password: string
}
