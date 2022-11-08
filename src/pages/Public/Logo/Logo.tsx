import React from 'react'
import cls from 'classnames'
import s from './Logo.module.scss'

import logo from 'shared/assets/images/logo/logo.svg'

const Logo = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.contentWrapper}>
                <img src={logo} />
            </div>
        </div>
    )
}

export default Logo
