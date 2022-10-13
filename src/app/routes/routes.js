import { LoginAsync } from '../../pages/Login/LoginAsync'
import { RegisterAsync } from '../../pages/Register/RegisterAsync'
import * as routes from './consts'

const publicRoutes = [
   {
      path: routes.ROUTE_REGISTER,
      Component: RegisterAsync,
   },
   {
      path: routes.ROUTE_LOGIN,
      Component: LoginAsync,
   }
]

const privateRoutes = [

]

