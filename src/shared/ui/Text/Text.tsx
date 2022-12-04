import { FC } from 'react'
import s from './Text.module.scss'
import cls from 'classnames'

interface TextProps {
    className?: string
    title?: string
    subtitle?: string
    mediumText?: string
    text?: string
}

export const Text: FC<TextProps> = ({
    className,
    title,
    subtitle,
    mediumText,
    text,
}) => {
    return (
        <div className={cls(s.Text, className)}>
            <div className={cls(className, s.title)}>{title && title}</div>
            <div className={cls(className, s.subtitle)}>
                {subtitle && subtitle}
            </div>
            <div className={cls(className, s.mediumText)}>
                {mediumText && mediumText}
            </div>
            <div className={cls(className, s.text)}>{text && text}</div>
        </div>
    )
}
