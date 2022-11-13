import { useState } from 'react'

import cls from 'classnames'
import s from './Header.module.scss'

import { DroppedMenu, Link } from 'components'
import logo from 'shared/assets/images/logo/logoMini.png'
import avatar from 'shared/assets/images/user/User.svg'
import arrow from 'shared/assets/images/icons/Arrow.svg'
import { useLocation } from 'react-router'
import { Link as LinkButton } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/store/types'
import { thunkFetchLogout } from 'app/store/slices/user/thunk'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { ProfileMenu } from '../DroppedMenuContent/ProfileMenu/ProfileMenu'

interface HeaderProps {
    isOpened?: boolean
    setIsOpened?: () => void
    onClick?: (e) => void
}

const Header: React.FC<HeaderProps> = ({ isOpened, setIsOpened, onClick }) => {
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
            {!data ? (
                <div className={s.contentWrapper}>
                    {location.pathname === routeConfig.HOME ? (
                        <div></div>
                    ) : (
                        <LinkButton to={routeConfig.HOME}>
                            <img src={logo} />
                        </LinkButton>
                    )}
                    <nav className={s.links}>
                        {links.map(link => (
                            <div key={link.path} className={s.navItem}>
                                <Link
                                    className={
                                        location.pathname === link.path &&
                                        s.active
                                    }
                                    variant={'clear'}
                                    to={link.path}
                                >
                                    {link.label}
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
            ) : (
                <div className={s.contentWrapper}>
                    <LinkButton to={routeConfig.HOME}>
                        <img src={logo} />
                    </LinkButton>
                    <nav className={s.links}>
                        <div onClick={onClick} className={s.user}>
                            <div className={s.userInfo}>
                                <img src={avatar} />
                                <label>{data.name}</label>
                            </div>
                            <img
                                onClick={setIsOpened}
                                className={cls(s.arrow, {
                                    [s.arrowRotated]: isOpened,
                                })}
                                src={arrow}
                            />
                        </div>
                        <DroppedMenu size={'medium'} isOpened={isOpened}>
                            <ProfileMenu data={data} onClick={onClickLogout} />
                        </DroppedMenu>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header
