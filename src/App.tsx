import React from 'react'
import cls from 'classnames'
import './styles/index.scss'

import { useAppDispatch, useAppSelector } from './store/types'
import { thunkFetchAuthMe } from './store/slices/user/userSlice'

import AppRouter from './Providers/AppRouter'
import Header from './features/Header/Header'

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const { data } = useAppSelector(state => state.user.user)

    React.useEffect(() => {
        dispatch(thunkFetchAuthMe())
    }, [])
    console.log(data)
    return (
        <div className={cls('app', 'default' === 'default' ? '' : 'dark')}>
            <Header />
            <React.Suspense fallback={<div>...loading</div>}>
                <AppRouter />
            </React.Suspense>
        </div>
    )
}

export default App
