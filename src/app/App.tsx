import React from 'react'
import cls from 'classnames'
import './styles/index.scss'

import { useAppDispatch, useAppSelector } from './store/types'
import { thunkFetchAuthMe } from './store/slices/user/thunk'

import AppRouter from './providers/router/AppRouter'
import Header from '../features/Header/Header'
import { useTheme } from './providers/ThemeProvider/useTheme'
import { Theme } from './providers/ThemeProvider/ThemeContext'
import Sidebar from '../features/Sidebar/Sidebar'
import { thunkFetchProductList } from './store/slices/products/thunk'

const App: React.FC = () => {
    const data = useAppSelector(state => state.user.user.data)
    const products = useAppSelector(state => state.products.data)
    const dispatch = useAppDispatch()
    const { theme } = useTheme()

    React.useEffect(() => {
        dispatch(thunkFetchAuthMe())
        dispatch(thunkFetchProductList())
    }, [])
    React.useEffect(() => {
        console.log(products)
    }, [products])

    return (
        <div className={cls('app', theme === Theme.LIGHT ? 'default' : 'dark')}>
            <Header />
            <div className='pageWrapper'>
                {data ? <Sidebar /> : null}
                <React.Suspense fallback={<div>...loading</div>}>
                    <AppRouter />
                </React.Suspense>
            </div>
        </div>
    )
}

export default App
