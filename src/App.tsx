import React from 'react'
import cls from 'classnames'
import './styles/index.scss'
import { useTranslation } from 'react-i18next'
import AppRouter from './Providers/AppRouter'

import Header from './features/Header/Header'

const App: React.FC = () => {
    const [theme, setTheme] = React.useState('default')
    const { t, i18n } = useTranslation()
    const toggleTheme = () => {
        setTheme(prev => (prev === 'default' ? 'dark' : 'default'))
    }
    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <div className={cls('app', theme === 'default' ? '' : 'dark')}>
            <Header />
            {/*{t('main')}*/}
            {/*<button type='button' onClick={toggleLang}>*/}
            {/*    {t('button')}*/}
            {/*</button>*/}
            {/*<button type='button' onClick={toggleTheme}>*/}
            {/*    {t('toggle')}*/}
            {/*</button>*/}
            {/*<Link to={routes.ROUTE_LOGIN}>LOGIN</Link>*/}
            {/*<Link to={routes.ROUTE_REGISTER}>REGISTER</Link>*/}
            <React.Suspense fallback={<div>...loading</div>}>
                <AppRouter />
            </React.Suspense>
        </div>
    )
}

export default App
