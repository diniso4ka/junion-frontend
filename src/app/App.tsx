import { useEffect, FC } from 'react'
import cls from 'classnames'
import './styles/index.scss'

import { useAppDispatch, useAppSelector } from './store/config/StateSchema'
import { useTheme } from './providers/ThemeProvider/useTheme'
import { Theme } from './providers/ThemeProvider/ThemeContext'

import AppRouter from './providers/router/AppRouter'
import Header from 'widgets/Header/Header'
import Sidebar from 'widgets/Sidebar/Sidebar'
import { PageLoader } from 'widgets/PageLoader/PageLoader'
import { getAuthData, getInitialize, thunkCheckAuthMe } from 'entities/User'
import { thunkFetchProductList } from 'entities/Products/model/services/thunkGetProductsList'
import { thunkGetCategoriesList } from 'entities/Categories/model/services/thunkGetCategoriesList'
import { thunkGetVendorsList } from '../entities/Vendors'

const App: FC = () => {
    const authData = useAppSelector(getAuthData)
    const initialize = useAppSelector(getInitialize)
    const dispatch = useAppDispatch()
    const { theme } = useTheme()

    useEffect(() => {
        dispatch(thunkCheckAuthMe())
    }, [])

    useEffect(() => {
        if (authData) {
            dispatch(thunkFetchProductList())
            dispatch(thunkGetCategoriesList())
            dispatch(thunkGetVendorsList())
        }
    }, [authData])

    return (
        <div className={cls('app', theme === Theme.LIGHT ? 'default' : 'dark')}>
            <Header onClick={e => e.stopPropagation()} />
            {!initialize && <PageLoader />}
            {initialize && (
                <div className='pageWrapper'>
                    {authData && <Sidebar />}
                    <AppRouter />
                </div>
            )}
        </div>
    )
}

export default App
