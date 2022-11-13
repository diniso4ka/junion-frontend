import { FC } from 'react'
import s from './ProfileMenu.module.scss'
import cls from 'classnames'
import { Button } from 'components'
import { IUserData } from 'shared/types/user'

interface ProfileMenuProps {
    className?: string
    onClick?: () => void
    data: IUserData
}

export const ProfileMenu: FC<ProfileMenuProps> = ({
    className,
    data,
    onClick,
}) => {
    return (
        <div className={cls(s.ProfileMenu, className)}>
            <label className={s.role}>
                {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
            </label>
            <label className={s.mail}>{data.email}</label>
            <Button onClick={onClick} variant={'text'}>
                Log Out
            </Button>
        </div>
    )
}
