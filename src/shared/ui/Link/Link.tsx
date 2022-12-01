import React from 'react'
import { Link as LinkButton, LinkProps, useMatch } from 'react-router-dom'

import cls from 'classnames'
import s from './Link.module.scss'

interface ILinkProps extends LinkProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'clear' | 'navigation'
    className?: string
    icon?: string
    isCollapsed?: boolean
}

export const Link: React.FC<ILinkProps> = React.memo(
    ({
        children,
        variant = 'primary',
        className,
        icon,
        isCollapsed = false,
        ...rest
    }) => {
        const match = useMatch(rest.to as string)
        const classes = cls(s.link, s[variant], className, {
            [s.active]: match,
            [s.collapsed]: !isCollapsed,
        })
        return (
            <div className={classes}>
                <LinkButton className={s.linkWrapper} {...rest}>
                    <div className={s.iconContainer}>
                        {icon && <img className={s.icon} src={icon} />}
                    </div>
                    <span className={s.label}>{children}</span>
                </LinkButton>
            </div>
        )
    }
)