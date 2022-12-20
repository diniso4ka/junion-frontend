import s from './Checkbox.module.scss'
import { FC, memo } from 'react'
import cls from 'classnames'

interface CheckboxProps {
    className?: string
    value: boolean
    onClick: () => void
    theme?: 'dark' | 'light'
}

export const Checkbox = memo(
    ({ className, onClick, value, theme }: CheckboxProps) => {
        return (
            <label className={cls(s.label, className)}>
                <input
                    onChange={() => console.log('checked')}
                    onClick={onClick}
                    checked={!value}
                    type='checkbox'
                    className={s.real}
                />
                <span
                    className={cls(s.custom, {
                        [s.dark]: theme === 'dark',
                    })}
                ></span>
            </label>
        )
    }
)
