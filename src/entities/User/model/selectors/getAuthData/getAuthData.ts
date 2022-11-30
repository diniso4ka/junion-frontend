import { StateSchema } from 'app/store/types'

export const getAuthData = (state: StateSchema) => state.user.authData
