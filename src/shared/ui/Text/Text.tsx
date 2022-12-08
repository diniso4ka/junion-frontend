import { FC } from 'react'
import s from './Text.module.scss'
import cls from 'classnames'

interface TextProps {
    className?: string
    title?: string
    subtitle?: string
    mediumText?: string
    text?: string
    date?: string
    weight?: 'light' | 'medium' | 'bold'
}

export const Text: FC<TextProps> = ({
    className,
    title,
    subtitle,
    mediumText,
    text,
    date,
    weight,
}) => {
    return (
        <span className={className}>
            {title && <h1 className={cls(className, s.title)}>{title}</h1>}
            {subtitle && (
                <h3 className={cls(className, s.subtitle, s[weight])}>
                    {subtitle}
                </h3>
            )}
            {mediumText && (
                <p className={cls(className, s.mediumText)}>{mediumText}</p>
            )}
            {text && <p className={cls(className, s.text)}>{text}</p>}
            {date && <p className={cls(className, s.date)}>{date}</p>}
        </span>
    )
}
