import { FC } from 'react'
import s from './TableHeading.module.scss'
import cls from 'classnames'

import arrow from 'shared/assets/images/icons/SmallArrow.svg'

interface TableHeading {
    className?: string
    type: 'products' | 'vendors' | 'categories'
    headings: any
}

export const TableHeading: FC<TableHeading> = ({
    className,
    type,
    headings,
}) => {
    return (
        <div className={cls(s.TableHeading, className)}>
            <ul className={s.items}>
                {headings.map(item => (
                    <li className={s.item}>
                        {item.value}{' '}
                        {item.sort && (
                            <img className={cls(s.sortIcon)} src={arrow} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
