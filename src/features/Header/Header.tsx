import React from 'react'

import cls from 'classnames'
import s from './Header.module.scss'

import { Button, Link } from 'components'
import logo from 'shared/assets/images/logo/logoMini.png'
import { useLocation } from 'react-router'
import { Link as LinkButton } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store/types'
import { thunkFetchLogout } from '../../app/store/slices/user/thunk'
import { routeConfig } from '../../shared/config/routeConfig/routeConfig'

const Header: React.FC = () => {
    const { data } = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const location = useLocation()
    const links = [
        { label: 'Log In', path: routeConfig.LOGIN },
        { label: 'Sign Up', path: routeConfig.REGISTER },
    ]

    const onClickLogout = () => {
        dispatch(thunkFetchLogout())
    }

    return (
        <header className={s.wrapper}>
            <div className={s.contentWrapper}>
                {location.pathname === routeConfig.MAIN ? (
                    <div></div>
                ) : (
                    <LinkButton to={routeConfig.MAIN}>
                        <img src={logo} />
                    </LinkButton>
                )}
                <nav className={s.links}>
                    {!data ? (
                        links.map(link => (
                            <div key={link.path} className={s.navItem}>
                                <Link
                                    className={
                                        location.pathname === link.path &&
                                        s.active
                                    }
                                    variant={'outline'}
                                    to={link.path}
                                >
                                    {link.label}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <Button onClick={onClickLogout}>Log Out</Button>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
