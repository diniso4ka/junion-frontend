//@ts-nocheck
import React, { ButtonHTMLAttributes } from 'react'
import cls from 'classnames'
import s from './SideButton.module.scss'
import { ReactComponent as Pencil } from 'shared/assets/images/icons/pencil.svg'
import { ReactComponent as Trashcan } from 'shared/assets/images/icons/trashcan.svg'

interface ISideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'delete' | 'update'
    isLoading?: boolean
    className?: string
    onClick?: () => void
    disable?: boolean
    active?: boolean
}

export const SideButton: React.FC<ISideButtonProps> = React.memo(
    ({ className, onClick, variant, isLoading, disable, active, ...rest }) => {
        const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            onClick?.()
        }
        const classnames = cls(s.button, className, {
            [s.disabled]: isLoading || disable,
            [s.active]: active,
        })
        return (
            <button
                disabled={isLoading || disable}
                type='button'
                className={classnames}
                onClick={e => onToggleClick(e)}
                {...rest}
            >
                <div>{variant === 'delete' ? <Trashcan /> : <Pencil />}</div>
            </button>
        )
    }
)
