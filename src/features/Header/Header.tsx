import cls from 'classnames'
import s from './Header.module.scss'

import { DroppedMenu, Link } from 'components'
import logo from 'shared/assets/images/logo/logoMini.png'
import avatar from 'shared/assets/images/user/User.svg'
import arrow from 'shared/assets/images/icons/Arrow.svg'
import { useLocation, useNavigate } from 'react-router'
import { Link as LinkButton } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/store/types'
import { thunkFetchAuthMe, thunkFetchLogout } from 'app/store/slices/user/thunk'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { ProfileMenu } from '../DroppedMenuContent/ProfileMenu/ProfileMenu'
import { useRef, useState } from 'react'
import { useClickOutside } from 'shared/hooks/useClickOutside'

interface HeaderProps {
    onClick?: (e) => void
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
    const [profileIsOpen, setProfileIsOpen] = useState(false)
    const navigate = useNavigate()
    const { data } = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const location = useLocation()
    const links = [
        { label: 'Log In', path: routeConfig.LOGIN },
        { label: 'Sign Up', path: routeConfig.REGISTER },
    ]

    const ref = useRef()
    useClickOutside(ref, () => setProfileIsOpen(false))
    const onClickLogout = async () => {
        dispatch(thunkFetchLogout())
        navigate(routeConfig.HOME)
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
                                <Link variant={'clear'} to={link.path}>
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
                    <nav ref={ref} className={s.links}>
                        <div onClick={onClick} className={s.user}>
                            <div className={s.userInfo}>
                                <img src={avatar} />
                                <label>{data.name}</label>
                            </div>
                            <img
                                onClick={() => setProfileIsOpen(!profileIsOpen)}
                                className={cls(s.arrow, {
                                    [s.arrowRotated]: profileIsOpen,
                                })}
                                src={arrow}
                            />
                        </div>
                        <DroppedMenu size={'small'} isOpened={profileIsOpen}>
                            <ProfileMenu data={data} onClick={onClickLogout} />
                        </DroppedMenu>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Header
