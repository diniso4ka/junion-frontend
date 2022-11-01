import React from 'react'
import cls from 'classnames'
import s from './Button.module.scss'

interface IButtonProps {
    children: React.ReactNode
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'outline'
    classname?: string
    onClick?: () => void
}

export const Button: React.FC<IButtonProps> = ({
    children,
    type = 'button',
    variant = 'primary',
    classname,
    onClick,
}) => {
    const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onClick?.()
    }
    const classnames = cls(s.button, s[variant], classname)
    return (
        <button
            type={type}
            className={classnames}
            onClick={e => onToggleClick(e)}
        >
            {children}
        </button>
    )
}
