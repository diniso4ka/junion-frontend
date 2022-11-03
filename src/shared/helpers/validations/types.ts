export interface IValidationResponseData {
    email: string | undefined
    password: string | undefined
    correctPassword?: string | undefined
    name?: string | undefined
}

export interface IRegisterReqData {
    email: string | null
    password: string | null
    correctPassword?: string | null
    name: string | null
}
export interface ILoginReqData {
    email: string | null
    password: string | null
}
