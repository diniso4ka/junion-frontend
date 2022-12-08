import { FC } from 'react'
import s from './List.module.scss'
import cls from 'classnames'
import { Preloader, Text } from 'shared/ui/index'

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
    return isLoading ? (
        <div className={cls(s.List, className, s.loading)}>
            <Preloader />
        </div>
    ) : (
        <div className={cls(s.List, className)}>
            <Text weight={'bold'} className={s.title} subtitle={data.title} />
            <ul>
                {data.items.map(item => (
                    <li key={item.label} className={s.item}>
                        <Text
                            className={s.label}
                            weight={'medium'}
                            subtitle={item.label}
                        />
                        <span
                            onClick={() => onClick?.(item.label)}
                            className={s.value}
                        >
                            {item.value}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
