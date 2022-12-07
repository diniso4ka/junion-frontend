import { Route, Routes } from 'react-router-dom'
import React from 'react'
import NotFound from 'pages/NotFound/NotFound'

import {
    privateRoutes,
    publicRoutes,
} from 'shared/config/routeConfig/routeConfig'

import { useAppSelector } from 'app/store/config/StateSchema'
import { getAuthData } from 'entities/User'

const AppRouter = () => {
    const authData = useAppSelector(getAuthData)

    return authData ? (
        <React.Suspense fallback={<div>...loading</div>}>
            <Routes>
                {privateRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </React.Suspense>
    ) : (
        <React.Suspense fallback={<div>...loading</div>}>
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                <Route path={'*'} element={<NotFound />} />
            </Routes>
        </React.Suspense>
    )
}

export default AppRouter
