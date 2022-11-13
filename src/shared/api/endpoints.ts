export const endpoints = {
    users: {
        register: '/users/register',
        login: '/users/login',
        me: '/users/current',
        logout: '/users/logout',
    },
    products: {
        list: `/products`,
        filtredList: params => `/products?${params}`,
    },
}
