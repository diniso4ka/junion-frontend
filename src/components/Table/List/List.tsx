import { FC } from 'react'
import s from './List.module.scss'
import cls from 'classnames'
import { Preloader } from 'components'

interface ListProps {
    className?: string
    isLoading: boolean
    data: {
        title: string
        items: {
            label: string
            value: string
        }[]
    }
}

export const List: FC<ListProps> = ({ className, data, isLoading }) => {
    return isLoading ? (
        <div className={cls(s.List, className, s.loading)}>
            <Preloader />
        </div>
    ) : (
        <div className={cls(s.List, className)}>
            <h3 className={s.title}>{data.title}</h3>
            <ul>
                {data.items.map(item => (
                    <li key={item.value} className={s.item}>
                        <p className={s.label}>{item.label}</p>
                        <p className={s.value}>{item.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
