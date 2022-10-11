import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import * as routes from './consts'

const publicRoutes = [
   {
      path: routes.ROUTE_REGISTER,
      Component: Register,
   },
   {
      path: routes.ROUTE_LOGIN,
      Component: Login,
   }
]

const privateRoutes = [

]

