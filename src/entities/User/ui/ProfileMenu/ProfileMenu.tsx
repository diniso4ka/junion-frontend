import { FC } from 'react'
import s from './ProfileMenu.module.scss'
import cls from 'classnames'
import { Button, DroppedMenu } from 'shared/ui'
import { User } from '../../model/types/user'

interface ProfileMenuProps {
    className?: string
    data: User
    onClickLogout: () => void
    isOpened: boolean
}

export const ProfileMenu: FC<ProfileMenuProps> = ({
    className,
    data,
    onClickLogout,
    isOpened,
}) => {
    return (
        <DroppedMenu size={'small'} isOpened={isOpened}>
            <div className={cls(s.ProfileMenu, className)}>
                <label className={s.role}>
                    {data.role.charAt(0).toUpperCase() + data.role.slice(1)}
                </label>
                <label className={s.mail}>{data.email}</label>
                <Button onClick={onClickLogout} variant={'text'}>
                    Log Out
                </Button>
            </div>
        </DroppedMenu>
    )
}
