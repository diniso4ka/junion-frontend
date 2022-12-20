import React, { ButtonHTMLAttributes } from 'react'
import cls from 'classnames'
import s from './Button.module.scss'
import { Preloader } from '../Preloader/Preloader'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    type?: 'button' | 'submit'
<<<<<<< HEAD
    variant?: 'primary' | 'secondary' | 'rounded' | 'outline' | 'text'
    theme?: 'darkGrey' | 'lightGrey' | 'purple'
=======
    variant?: 'primary' | 'secondary' | 'rounded' | 'outline' | 'text' | 'hint'
>>>>>>> 66bfe69 (refactor)
    size?: 'large' | 'medium' | 'small'
    isLoading?: boolean
    className?: string
    onClick?: () => void
}

export const Button: React.FC<IButtonProps> = React.memo(
    ({
        children,
        type = 'button',
        variant = 'primary',
        theme = 'darkGrey',
        size = 'medium',
        className,
        onClick,
        isLoading,
        ...rest
    }) => {
        const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            onClick?.()
        }
        const classnames = cls(
            s.button,
            s[variant],
            s[theme],
            s[size],
            className,
            {
                [s.disabled]: isLoading,
            }
        )
        return (
            <button
                disabled={isLoading}
                type={type}
                className={classnames}
                onClick={e => onToggleClick(e)}
                {...rest}
            >
                {isLoading ? <Preloader /> : children}
            </button>
        )
    }
)
