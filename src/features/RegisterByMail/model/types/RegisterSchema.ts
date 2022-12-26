export interface RegisterSchema extends RegisterForm {
    isLoading: boolean
    asyncErrors?: {
        superCode?: string
        mail?: string
    }
}

export interface RegisterForm {
    mail?: string
    password?: string
    confirmPassword?: string
    name?: string
    superCode?: string
}
