import * as routes from './consts'

import { EnterEmail, Login, Logo, Main, Register, SendLink } from 'pages'

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
