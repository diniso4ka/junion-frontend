import React from 'react'
import { Link as LinkButton } from 'react-router-dom'

import cls from 'classnames'
import s from './Link.module.scss'

interface ILinkProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    className?: string
    to: string
}

export const Link: React.FC<ILinkProps> = ({
    children,
    to,
    variant = 'primary',
    className,
}) => {
    const classes = cls(s.link, s[variant], className && s[className])
    return (
        <div className={classes}>
            <LinkButton to={to}>{children}</LinkButton>
        </div>
    )
}
