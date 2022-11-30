export interface RegisterSchema {
    mail: string
    password: string
    confirmPassword: string
    name: string
    superCode: string
    isLoading: boolean
    asyncErrors?: {
        superCode?: string
        mail?: string
    }
}
