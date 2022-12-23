import React, { memo } from 'react'
import { Link as LinkButton, LinkProps, useMatch } from 'react-router-dom'

import cls from 'classnames'
import s from './Link.module.scss'

interface ILinkProps extends LinkProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline' | 'clear' | 'navigation'
    className?: string
    Icon?: any //TODO need typing
    isCollapsed?: boolean
}

export const Link = memo(
    ({
        children,
        variant = 'primary',
        className,
        Icon,
        isCollapsed = false,
        ...rest
    }: ILinkProps) => {
        const match = useMatch(rest.to as string)
        const classes = cls(s.link, s[variant], className, {
            [s.active]: match,
            [s.collapsed]: !isCollapsed,
        })

        return (
            <div className={classes}>
                <LinkButton className={s.linkWrapper} {...rest}>
                    <div className={s.iconContainer}>
                        {Icon && <Icon className={s.icon} />}
                    </div>
                    <span className={s.label}>{children}</span>
                </LinkButton>
            </div>
        )
    }
)
