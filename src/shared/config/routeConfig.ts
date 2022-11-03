import * as routes from './consts'

import Logo from '../../pages/Logo/Logo'
import Main from '../../pages/Main/Main'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import EnterEmail from '../../pages/ForgotPassword/EnterEmail/EnterEmail'
import SendLink from '../../pages/ForgotPassword/SendLink/SendLink'

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
    {
        path: routes.ROUTE_ENTEREMAIL,
        Component: EnterEmail,
    },
    {
        path: routes.ROUTE_SENDLINK,
        Component: SendLink,
    },
]

export const privateRoutes = [
    {
        path: routes.ROUTE_MAIN,
        Component: Main,
    },
]
