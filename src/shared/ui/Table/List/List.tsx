import { FC } from 'react'
import s from './List.module.scss'
import cls from 'classnames'
import { Preloader } from 'shared/ui/index'

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
    onClick?: (string) => void
}

export const List: FC<ListProps> = ({
    className,
    data,
    isLoading,
    onClick,
}) => {
    const onHandleClick = i => {
        return data.items[i].label
    }
    return isLoading ? (
        <div className={cls(s.List, className, s.loading)}>
            <Preloader />
        </div>
    ) : (
        <div className={cls(s.List, className)}>
            <h3 className={s.title}>{data.title}</h3>
            <ul>
                {data.items.map(item => (
                    <li key={item.label} className={s.item}>
                        <p className={s.label}>{item.label}</p>
                        <p
                            onClick={() => onClick?.(item.label)}
                            className={s.value}
                        >
                            {item.value}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
