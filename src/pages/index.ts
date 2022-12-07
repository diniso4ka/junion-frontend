import { LoginPageAsync as Login } from './Public/Auth/Login/LoginPage.async'
import { RegisterPageAsync as Register } from './Public/Auth/Register/RegisterPage.async'
import Logo from './Public/Logo/LogoPage'
import { EnterEmailPageAsync as SendLink } from './Public/ForgotPassword/SendLink/SendLinkPage.async'
import { EnterEmailPageAsync as EnterEmail } from './Public/ForgotPassword/EnterEmail/EnterEmail.async'

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
