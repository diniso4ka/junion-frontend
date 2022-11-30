export interface User {
    name: string
    email: string
    role: string
}
export interface UserSchema {
    authData?: User
    initialize: boolean
}
