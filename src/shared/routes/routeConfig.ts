import * as routes from './consts'

import Logo from '../../pages/Public/Logo/Logo'
import Main from '../../pages/Private/Main/Main'
import Login from '../../pages/Public/Auth/Login/Login'
import Register from '../../pages/Public/Auth/Register/Register'
import EnterEmail from '../../pages/Public/ForgotPassword/EnterEmail/EnterEmail'
import SendLink from '../../pages/Public/ForgotPassword/SendLink/SendLink'

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
