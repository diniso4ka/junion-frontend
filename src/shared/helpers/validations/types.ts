export interface IValidationResponseData {
    email: string | undefined
    password: string | undefined
    correctPassword?: string | undefined
    name?: string | undefined
}

export interface IRegisterReqData {
    email: string
    password: string
    correctPassword: string
    name: string
}
export interface ILoginReqData {
    email: string
    password: string
}
