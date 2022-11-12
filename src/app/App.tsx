import React from 'react'
import cls from 'classnames'
import './styles/index.scss'

import { useAppDispatch, useAppSelector } from './store/types'
import { thunkFetchAuthMe } from './store/slices/user/thunk'

import AppRouter from './providers/router/AppRouter'
import Header from '../features/Header/Header'
import { useTheme } from './providers/ThemeProvider/useTheme'
import { Theme } from './providers/ThemeProvider/ThemeContext'
import Sidebar from 'features/Sidebar/Sidebar'
import { thunkFetchProductList } from './store/slices/products/thunk'

import { PageLoader } from 'features/PageLoader/PageLoader'
import { fetchAuthMe } from '../shared/api/requests/user'
import axios from 'axios'

const App: React.FC = () => {
    const data = useAppSelector(state => state.user.user.data)
    const initialize = useAppSelector(state => state.user.initialize)
    const dispatch = useAppDispatch()
    const { theme } = useTheme()

    React.useEffect(() => {
        dispatch(thunkFetchAuthMe())
        dispatch(thunkFetchProductList())
    }, [])

    fetchAuthMe().then(res => console.log(res))

    return (
        <div className={cls('app', theme === Theme.LIGHT ? 'default' : 'dark')}>
            <Header />
            {!initialize && <PageLoader />}
            {initialize && (
                <div className='pageWrapper'>
                    {data && <Sidebar />}
                    <AppRouter />
                </div>
            )}
        </div>
    )
}

export default App
