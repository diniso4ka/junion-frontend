import React from 'react'

import cls from 'classnames'
import s from './Header.module.scss'

import * as routes from '../../shared/config/consts'
import { Link } from 'components'
import logo from 'shared/assets/images/logo/logoMini.png'
import { useLocation } from 'react-router'
import { Link as LinkButton } from 'react-router-dom'

const Header: React.FC = () => {
    const location = useLocation()
    const links = [
        { label: 'Log In', path: routes.ROUTE_LOGIN },
        { label: 'Sign Up', path: routes.ROUTE_REGISTER },
    ]

    return (
        <header className={s.wrapper}>
            <div className={s.contentWrapper}>
                {location.pathname === '/' ? (
                    <div></div>
                ) : (
                    <LinkButton to={routes.ROUTE_LOGO}>
                        <img src={logo} />
                    </LinkButton>
                )}
                <nav className={s.links}>
                    {links.map(link => (
                        <div key={link.path} className={s.navItem}>
                            <Link
                                key={link.path}
                                className={
                                    location.pathname === link.path && s.active
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
