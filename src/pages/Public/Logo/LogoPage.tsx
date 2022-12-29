import React from 'react'
import logo from 'shared/assets/images/logo/logo.svg'
import logoLeft from 'shared/assets/images/logo/logo-left.svg'
import logoRight from 'shared/assets/images/logo/logo-right.svg'
import s from './LogoPage.module.scss'

const LogoPage: React.FC = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.image}>
                <img src={logo} alt='Logo' />
            </div>
            <img src={logoLeft} className={s.left} alt='Oops' />
            <img src={logoRight} className={s.right} alt='Oops' />
        </div>
    )
}

export default LogoPage
