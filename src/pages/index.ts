import { LoginPageAsync as Login } from './Public/Auth/Login/LoginPage.async'
import { RegisterPageAsync as Register } from './Public/Auth/Register/RegisterPage.async'
import Logo from './Public/Logo/LogoPage'
import { CheckToken } from './Public/CheckToken/CheckToken'

import Home from './Private/Home/HomePage'
import { AsyncCategoriesPage as Categories } from './Private/Categories/AsyncCategoriesPage'
import Products from './Private/Products/ProductsPage'
import { AsyncVendorsPage as Vendors } from './Private/Vendors/AsyncVendorsPage'
import { ChangePasswordAsync as ChangePassword } from './Private/ChangePassword/ChangePassword.async'

export {
    Login,
    Register,
    Logo,
    Home,
    Vendors,
    Products,
    Categories,
    ChangePassword,
    CheckToken,
}
