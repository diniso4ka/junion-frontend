import * as routes from './consts'

import { RegisterAsync } from '../../pages/Register/RegisterAsync'
import { LoginAsync } from '../../pages/Login/LoginAsync'
import Logo from '../../pages/Logo/Logo'
import Main from '../../pages/Main/Main'

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

export const privateRoutes = [
    {
        path: routes.ROUTE_MAIN,
        Component: Main,
    },
]
