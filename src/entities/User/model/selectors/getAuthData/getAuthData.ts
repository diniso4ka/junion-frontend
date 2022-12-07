import { StateSchema } from 'app/store/config/StateSchema'

export const getAuthData = (state: StateSchema) => state.user.authData
