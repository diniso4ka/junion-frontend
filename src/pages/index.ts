import Login from './Public/Auth/Login/LoginPage'
import Register from './Public/Auth/Register/RegisterPage'
import Logo from './Public/Logo/LogoPage'
import { AsyncEnterEmailPage as SendLink } from './Public/ForgotPassword/SendLink/AsyncSendLinkPage'
import { AsyncEnterEmailPage as EnterEmail } from './Public/ForgotPassword/EnterEmail/AsyncEnterEmail'

import Home from './Private/Home/HomePage'
import { AsyncCategoriesPage as Categories } from './Private/Categoires/AsyncCategoriesPage'
import Products from './Private/Products/ProductsPage'
import { AsyncVendorsPage as Vendors } from './Private/Vendors/AsyncVendorsPage'

export {
    Login,
    Register,
    Logo,
    Home,
    EnterEmail,
    SendLink,
    Vendors,
    Products,
    Categories,
}
