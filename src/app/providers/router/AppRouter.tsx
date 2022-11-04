import { Navigate, Route, Routes } from 'react-router-dom'

import { privateRoutes, publicRoutes } from '../../../shared/routes/routeConfig'
import * as routes from 'shared/routes/consts'

import { useAppSelector } from '../../store/types'

const AppRouter = () => {
    const { data } = useAppSelector(state => state.user.user)

    return !data ? (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route path={path} element={<Component />} />
            ))}
            <Route path={'*'} element={<Navigate to={routes.ROUTE_LOGO} />} />
        </Routes>
    ) : (
        <Routes>
            {privateRoutes.map(({ path, Component }) => (
                <Route path={path} element={<Component />} />
            ))}
            <Route path={'*'} element={<Navigate to={routes.ROUTE_MAIN} />} />
        </Routes>
    )
}

export default AppRouter
