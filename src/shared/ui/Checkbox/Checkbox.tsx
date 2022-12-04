import s from './Checkbox.module.scss'
import { FC } from 'react'
import cls from 'classnames'

interface CheckboxProps {
    className?: string
    value: boolean
    onClick: () => void
}

export const Checkbox: FC<CheckboxProps> = ({ className, onClick, value }) => {
    return (
        <label className={cls(s.label, className)}>
            <input
                onClick={onClick}
                checked={!value}
                type='checkbox'
                className={s.real}
            />
            <span className={s.custom}></span>
        </label>
    )
}
