import { FC } from 'react'
import s from './DroppedMenu.module.scss'
import cls from 'classnames'
import { Button } from '../Button'
import { IUserData } from '../../app/store/slices/user/types'

interface DroppedMenuProps {
    data?: IUserData
    size: 'large' | 'medium' | 'small'
    className?: string
    isOpened: boolean
    onClick: () => void
}

export const DroppedMenu: FC<DroppedMenuProps> = ({
    data,
    className,
    size,
    isOpened,
    onClick,
}) => {
    return (
        <div
            className={cls(
                s.DroppedMenu,
                {
                    [s.wrapperLarge]: size === 'large',
                    [s.wrapperMedium]: size === 'medium',
                    [s.wrapperSmall]: size === 'small',
                },
                {
                    [s.opened]: isOpened,
                }
            )}
        >
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
