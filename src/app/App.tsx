import React from 'react'
import cls from 'classnames'
import './styles/index.scss'

import { useAppDispatch } from './store/types'
import { thunkFetchAuthMe } from './store/slices/user/userSlice'

import AppRouter from './providers/router/AppRouter'
import Header from '../features/Header/Header'
import { useTheme } from './providers/ThemeProvider/useTheme'
import { Theme } from './providers/ThemeProvider/ThemeContext'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const { theme } = useTheme()

    React.useEffect(() => {
        dispatch(thunkFetchAuthMe())
    }, [])

    return (
        <div className={cls('app', theme === Theme.LIGHT ? 'default' : 'dark')}>
            <Header />
            <React.Suspense fallback={<div>...loading</div>}>
                <AppRouter />
            </React.Suspense>
        </div>
    )
}

export default App
