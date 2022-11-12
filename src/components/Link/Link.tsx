import React from 'react'
import { Link as LinkButton, LinkProps } from 'react-router-dom'

import cls from 'classnames'
import s from './Link.module.scss'

interface ILinkProps extends LinkProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'clear'
    className?: string
}

export const Link: React.FC<ILinkProps> = React.memo(
    ({ children, variant = 'primary', className, ...rest }) => {
        const classes = cls(s.link, s[variant], className)
        return (
            <div className={classes}>
                <LinkButton {...rest}>{children}</LinkButton>
            </div>
        )
    }
)
