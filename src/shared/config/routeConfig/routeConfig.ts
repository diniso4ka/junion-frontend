import {
    EnterEmail,
    Login,
    Logo,
    Home,
    Register,
    SendLink,
    Categories,
    Products,
    Vendors,
    ChangePassword,
    CheckToken,
} from 'pages'
import React from 'react'

export enum routeConfig {
    REGISTER = '/register',
    LOGIN = '/login',
    ENTEREMAIL = '/retrievepass',
    SENDLINK = '/retrievepassconfirm',
    HOME = '/',
    CATEGORIES = '/categories',
    PRODUCTS = '/products',
    VENDORS = '/vendors',
    CHANGE_PASSWORD = '/user/changepass',
    CHECK_TOKEN = '/retrieve/:verifyToken',
    NOT_ACTIVE = '/notactive',
}
export interface routesProps {
    path: string
    Component: React.FC
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
        path: routeConfig.HOME,
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
    {
        path: routeConfig.CHECK_TOKEN,
        Component: CheckToken,
    },
]

export const privateRoutes: routesProps[] = [
    {
        path: routeConfig.HOME,
        Component: Home,
    },
    {
        path: routeConfig.CATEGORIES,
        Component: Categories,
    },
    {
        path: routeConfig.PRODUCTS,
        Component: Products,
    },
    {
        path: routeConfig.VENDORS,
        Component: Vendors,
    },
    {
        path: routeConfig.CHANGE_PASSWORD,
        Component: ChangePassword,
    },
]
