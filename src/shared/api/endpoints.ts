export const endpoints = {
    users: {
        register: '/users/register',
        login: '/users/login',
        me: '/users/current',
        logout: '/users/logout',
    },
    password: '/retrieve',
    products: {
        list: `/products`,
        filteredList: params => `/products?${params}`,
    },
    categories: '/categories',
    vendors: '/vendors',
}
