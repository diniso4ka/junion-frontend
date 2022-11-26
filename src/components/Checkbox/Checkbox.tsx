import s from './Checkbox.module.scss'
import { FC } from 'react'

export const Checkbox: FC = () => {
    return (
        <label className={s.label}>
            <input type='checkbox' className={s.real} />
            <span className={s.custom}></span>
        </label>
    )
}