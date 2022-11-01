import React from 'react'

import cls from 'classnames'
import s from './Header.module.scss'

import * as routes from '../../shared/config/consts'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className={s.wrapper}>
            <div className={s.contentWrapper}>
                <div className={s.link}>
                    <Link className={s.linke} to={routes.ROUTE_LOGIN}>
                        Log In
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
