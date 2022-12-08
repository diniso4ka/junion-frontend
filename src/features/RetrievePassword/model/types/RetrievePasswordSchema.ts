export interface RetrievePasswordSchema {
    mail: string
    form: {
        password: string
        confirmPassword: string
    }
    isLoading: boolean
    error?: boolean
}
