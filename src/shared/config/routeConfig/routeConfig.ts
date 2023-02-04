import {
	Categories,
	ChangePassword,
	CheckToken,
	Home,
	Login,
	Logo,
	Products,
	Register,
	Vendors,
} from 'pages';
import React from 'react';

export enum routeConfig {
	REGISTER = '/register',
	LOGIN = '/login',
	HOME = '/',
	CATEGORIES = '/categories',
	PRODUCTS = '/products',
	VENDORS = '/vendors',
	CHANGE_PASSWORD = '/user/changepass',
	CHECK_TOKEN = '/retrieve/:verifyToken',
}
export interface routesProps {
	path: string;
	Component: React.FC;
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
		path: routeConfig.CHECK_TOKEN,
		Component: CheckToken,
	},
];

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
	{
		path: routeConfig.CHECK_TOKEN,
		Component: ChangePassword,
	},
];
