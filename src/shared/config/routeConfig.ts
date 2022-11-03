import * as routes from './consts'

import Logo from '../../pages/Logo/Logo'
import Main from '../../pages/Main/Main'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'

export const publicRoutes = [
    {
        path: routes.ROUTE_REGISTER,
        Component: Register,
    },
    {
        path: routes.ROUTE_LOGIN,
        Component: Login,
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
