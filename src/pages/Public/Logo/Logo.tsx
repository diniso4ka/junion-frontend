import React from 'react'
import cls from 'classnames'
import s from './Logo.module.scss'

import logo from 'shared/assets/images/logo/logo.svg'

const Logo = () => {
    return (
        <div className={s.wrapper}>
            <img src={logo} />
        </div>
    )
}

export default Logo
