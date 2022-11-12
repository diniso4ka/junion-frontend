import { FC } from 'react'
import s from './TableRow.module.scss'
import cls from 'classnames'

import update from 'shared/assets/images/icons/update.svg'

interface TableRow {
    className?: string
    type: 'products' | 'vendors' | 'categories'
    product: any
}

export const TableRow: FC<TableRow> = ({ className, type, product }) => {
    return (
        <div className={cls(s.TableRow, className)}>
            <ul className={s.items}>
                <li className={s.item}>{product.vendor}</li>
                <li className={s.item}>{product.art}</li>
                <li className={s.item}>{product.category}</li>
                <li className={s.item}>{product.name}</li>
                <li className={s.item}>{product.price}</li>
                <li className={s.item}>{product.quantity}</li>
                <li className={s.item}>NR</li>
                <li className={s.item}>{product.owner}</li>
                <img src={update} />
            </ul>
        </div>
    )
}
