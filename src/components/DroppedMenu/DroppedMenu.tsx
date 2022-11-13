import { FC, ReactNode } from 'react'
import s from './DroppedMenu.module.scss'
import cls from 'classnames'
import { IUserData } from 'shared/types/user'

interface DroppedMenuProps {
    data?: IUserData
    size: 'large' | 'medium' | 'small'
    className?: string
    isOpened: boolean
    children: ReactNode
}

export const DroppedMenu: FC<DroppedMenuProps> = ({
    className,
    size,
    isOpened,
    children,
}) => {
    return (
        <div
            className={cls(
                className,
                s.DroppedMenu,
                {
                    [s.wrapperLarge]: size === 'large',
                    [s.wrapperMedium]: size === 'medium',
                    [s.wrapperSmall]: size === 'small',
                },
                {
                    [s.openedMedium]: isOpened && size === 'medium',
                    [s.openedLarge]: isOpened && size === 'large',
                }
            )}
        >
            {children}
        </div>
    )
}
