import * as routes from './consts'
import { RegisterAsync } from '../../pages/Register/RegisterAsync'
import { LoginAsync } from '../../pages/Login/LoginAsync'
import Logo from '../../pages/Logo/Logo'

export const publicRoutes = [
    {
        path: routes.ROUTE_REGISTER,
        Component: RegisterAsync,
    },
    {
        path: routes.ROUTE_LOGIN,
        Component: LoginAsync,
    },
    {
        path: routes.ROUTE_LOGO,
        Component: Logo,
    },
]

const privateRoutes = []
