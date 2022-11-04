import { Navigate, Route, Routes } from 'react-router-dom'

import {
    privateRoutes,
    publicRoutes,
    routeConfig,
} from 'shared/config/routeConfig/routeConfig'

import { useAppSelector } from 'app/store/types'

const AppRouter = () => {
    const { data } = useAppSelector(state => state.user.user)

    return !data ? (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path={'*'} element={<Navigate to={routeConfig.MAIN} />} />
        </Routes>
    ) : (
        <Routes>
            {privateRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path={'*'} element={<Navigate to={routeConfig.MAIN} />} />
        </Routes>
    )
}

export default AppRouter
