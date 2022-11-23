import { useEffect, useState, FC } from 'react'
import cls from 'classnames'
import './styles/index.scss'

import { useAppDispatch, useAppSelector } from './store/types'
import { thunkFetchAuthMe } from './store/slices/user/thunk'
import { thunkFetchProductList } from './store/slices/products/thunk'
import { useTheme } from './providers/ThemeProvider/useTheme'
import { Theme } from './providers/ThemeProvider/ThemeContext'

import AppRouter from './providers/router/AppRouter'
import Header from 'features/Header/Header'
import Sidebar from 'features/Sidebar/Sidebar'
import { PageLoader } from 'features/PageLoader/PageLoader'

const App: FC = () => {
    const [userIsOpened, setUserIsOpened] = useState(false)
    const data = useAppSelector(state => state.user.user)
    const initialize = useAppSelector(state => state.user.initialize)
    const dispatch = useAppDispatch()
    const { theme } = useTheme()

    const closeAllModals = () => {
        setUserIsOpened(false)
    }

    useEffect(() => {
        dispatch(thunkFetchAuthMe())
    }, [])

    useEffect(() => {
        if (data.auth) {
            dispatch(thunkFetchProductList())
        }
    }, [data.auth])

    return (
        <div
            onClick={closeAllModals}
            className={cls('app', theme === Theme.LIGHT ? 'default' : 'dark')}
        >
            <Header
                onClick={e => e.stopPropagation()}
                setIsOpened={() => setUserIsOpened(!userIsOpened)}
                isOpened={userIsOpened}
            />
            {!initialize && <PageLoader />}
            {initialize && (
                <div className='pageWrapper'>
                    {data.auth && <Sidebar />}
                    <AppRouter />
                </div>
            )}
        </div>
    )
}

export default App
