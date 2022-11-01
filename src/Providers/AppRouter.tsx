import { Route, Routes } from 'react-router-dom'
import { publicRoutes } from '../shared/config/routeConfig'

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route path={path} element={<Component />} />
            ))}
        </Routes>
    )
}

export default AppRouter
