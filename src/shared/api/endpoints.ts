export const endpoints = {
	users: {
		register: '/users/register',
		login: '/users/login',
		me: '/users/current',
		logout: '/users/logout',
		restorePass: '/users/restorePass',
		changePass: '/users/changePass',
		checkToken: '/users/checkToken',
	},
	products: {
		list: '/products',
		filteredList: (params) => `/products?${params}`,
	},
	categories: '/categories',
	vendors: '/vendors',
};
