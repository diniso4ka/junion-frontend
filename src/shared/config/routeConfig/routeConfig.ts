import { EnterEmail, Login, Logo, HomePage, Register, SendLink } from 'pages'
import React from 'react'

export enum routeConfig {
    REGISTER = '/register',
    LOGIN = '/login',
    ENTEREMAIL = '/fpel',
    SENDLINK = '/fpsl',
    MAIN = '/',
}
export interface routesProps {
    path: string
    Component: React.FC<{}>
}

export const publicRoutes: routesProps[] = [
    {
        path: routeConfig.REGISTER,
        Component: Register,
    },
    {
        path: routeConfig.LOGIN,
        Component: Login,
    },
    {
        path: routeConfig.MAIN,
        Component: Logo,
    },
    {
        path: routeConfig.ENTEREMAIL,
        Component: EnterEmail,
    },
    {
        path: routeConfig.SENDLINK,
        Component: SendLink,
    },
]

export const privateRoutes: routesProps[] = [
    {
        path: routeConfig.MAIN,
        Component: HomePage,
    },
]
