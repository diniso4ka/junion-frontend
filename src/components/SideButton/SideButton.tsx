//@ts-nocheck
import React, { ButtonHTMLAttributes } from 'react'
import cls from 'classnames'
import s from './SideButton.module.scss'
import Pencil from 'shared/assets/images/icons/pencil.svg'
import Trashcan from 'shared/assets/images/icons/trashcan.svg'

interface ISideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'delete' | 'update'
    isLoading?: boolean
    className?: string
    onClick?: () => void
}

export const SideButton: React.FC<ISideButtonProps> = React.memo(
    ({ className, onClick, variant, isLoading, ...rest }) => {
        const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            onClick?.()
        }
        const classnames = cls(s.button, className, {
            [s.disabled]: isLoading,
        })
        return (
            <button
                disabled={isLoading}
                type='button'
                className={classnames}
                onClick={e => onToggleClick(e)}
                {...rest}
            >
                <img src={variant === 'delete' ? Trashcan : Pencil} alt='' />
            </button>
        )
    }
)
