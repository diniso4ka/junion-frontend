import { FC } from 'react'
import s from './TableRow.module.scss'
import cls from 'classnames'

import { Checkbox } from 'shared/ui/index'

interface TableRow {
    className?: string
    type: 'products' | 'vendors' | 'categories'
    item: any
}

export const TableRow: FC<TableRow> = ({ className, type, item }) => {
    return (
        <div className={cls(s.TableRow, className)}>
            {type === 'products' && (
                <ul className={cls(s.items, s[type])}>
                    <li className={s.item}>{`${item.vendor}-${item.art}`}</li>
                    <li className={s.item}>{item.category}</li>
                    <li className={s.item}>{item.name}</li>
                    <li className={s.item}>{item.price}</li>
                    <li className={s.item}>{item.quantity}</li>
                    <li className={s.item}>NR</li>
                    <li className={s.item}>{item.owner}</li>
                    <li>
                        <Checkbox
                            value={false}
                            onClick={() => console.log('123')}
                        />
                    </li>
                </ul>
            )}
            {type === 'categories' && (
                <ul className={cls(s.items, s[type])}>
                    <li>
                        <Checkbox
                            value={false}
                            onClick={() => console.log('123')}
                        />
                    </li>
                    <li className={s.item}>{item._id}</li>
                    <li className={s.item}>{item.quantity}</li>
                </ul>
            )}
        </div>
    )
}
