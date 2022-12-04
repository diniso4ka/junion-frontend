import { FC } from 'react'
import s from './DiscountTag.module.scss'
import cls from 'classnames'

interface DiscountTagProps {
    className?: string
    discount: number
}

export const DiscountTag: FC<DiscountTagProps> = ({ className, discount }) => {
    return (
        <div className={cls(s.DiscountTag, className)}>
            {discount < 0 ? 'error' : `-${discount}%`}
        </div>
    )
}
