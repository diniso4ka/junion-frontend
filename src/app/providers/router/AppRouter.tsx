import { Route, Routes, Navigate } from 'react-router-dom'
import React from 'react'
import NotFound from 'features/NotFound/NotFound'

import {
    privateRoutes,
    publicRoutes,
    routeConfig,
} from 'shared/config/routeConfig/routeConfig'

import { useAppSelector } from 'app/store/types'

const AppRouter = () => {
    const { user } = useAppSelector(state => state.user)

    return user.auth ? (
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
