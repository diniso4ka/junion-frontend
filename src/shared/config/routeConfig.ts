import * as routes from './consts'
import { RegisterAsync } from '../../pages/Register/RegisterAsync'
import { LoginAsync } from '../../pages/Login/LoginAsync'

export const publicRoutes = [
    {
        path: routes.ROUTE_REGISTER,
        Component: RegisterAsync,
    },
    {
        path: routes.ROUTE_LOGIN,
        Component: LoginAsync,
    },
]

const privateRoutes = []
