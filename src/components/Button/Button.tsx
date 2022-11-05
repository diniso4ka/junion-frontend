import React, { ButtonHTMLAttributes } from 'react'
import cls from 'classnames'
import s from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'outline'
    className?: string
    onClick?: () => void
}

export const Button: React.FC<IButtonProps> = React.memo(
    ({
        children,
        type = 'button',
        variant = 'primary',
        className,
        onClick,
        ...rest
    }) => {
        const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            onClick?.()
        }
        const classnames = cls(s.button, s[variant], className)
        return (
            <button
                type={type}
                className={classnames}
                onClick={e => onToggleClick(e)}
                {...rest}
            >
                {children}
            </button>
        )
    }
)
