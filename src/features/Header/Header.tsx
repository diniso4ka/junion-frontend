import React from 'react'

import cls from 'classnames'
import s from './Header.module.scss'

import * as routes from '../../shared/config/consts'
import { Link } from 'components'
import logo from 'shared/assets/images/logo/logoMini.png'
import { useLocation } from 'react-router'

const Header: React.FC = () => {
    const location = useLocation()
    console.log(location)
    const links = [
        { label: 'Log In', path: routes.ROUTE_LOGIN },
        { label: 'Sign Up', path: routes.ROUTE_REGISTER },
    ]

    return (
        <header className={s.wrapper}>
            <div className={s.contentWrapper}>
                <img src={logo} />
                <nav className={s.links}>
                    {links.map(link => (
                        <div className={s.navItem}>
                            <Link
                                className={
                                    location.pathname === link.path
                                        ? 'active'
                                        : ''
                                }
                                variant={'outline'}
                                to={link.path}
                            >
                                {link.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Header