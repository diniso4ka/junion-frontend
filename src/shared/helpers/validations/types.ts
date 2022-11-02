export interface IValidationResponseType {
    email: string | undefined
    password: string | undefined
    correctPassword?: string | undefined
    username?: string | undefined
}

export interface IRegisterReqData {
    email: string | null
    password: string | null
    correctPassword: string | null
    username: string | null
}
