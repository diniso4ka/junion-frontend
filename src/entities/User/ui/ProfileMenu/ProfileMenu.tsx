import { FC } from 'react'
import s from './ProfileMenu.module.scss'
import cls from 'classnames'
import { Button, DroppedMenu, Link } from 'shared/ui'
import { User } from '../../model/types/user'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'

interface ProfileMenuProps {
    className?: string
    data: User
    onClickLogout: () => void
    onClickChangePassword: () => void
    isOpened: boolean
}

export const ProfileMenu: FC<ProfileMenuProps> = ({
    className,
    data,
    onClickLogout,
    isOpened,
    onClickChangePassword,
}) => {
    return (
        <DroppedMenu size={'small'} isOpened={isOpened}>
            <div className={cls(s.ProfileMenu, className)}>
                <label className={s.role}>
                    {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
                </label>
                <label className={s.mail} title={data.email}>
                    {data.email}
                </label>
                <Link
                    className={s.changePassBtn}
                    to={routeConfig.CHANGE_PASSWORD}
                    onClick={onClickChangePassword}
                >
                    Change password
                </Link>
                <Button onClick={onClickLogout} variant={'text'}>
                    Log Out
                </Button>
            </div>
        </DroppedMenu>
    )
}
