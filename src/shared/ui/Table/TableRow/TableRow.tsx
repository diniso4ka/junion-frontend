import { FC } from 'react'
import s from './TableRow.module.scss'
import cls from 'classnames'

import { Checkbox } from 'shared/ui/index'
import { DiscountTag } from '../../DiscountTag/DiscountTag'

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
                    <li className={s.item}>
                        {item.discountPrice ? (
                            <span className={s.discount}>
                                {item.discountPrice}
                                <DiscountTag
                                    discount={
                                        100 -
                                        (item.discountPrice * 100) / item.price
                                    }
                                />
                            </span>
                        ) : (
                            item.price
                        )}
                    </li>
                    <li className={s.item}>{item.quantity}</li>
                    <li className={s.item}>{item.unit ? item.unit : ''}</li>
                    <li className={s.item}>{item.owner}</li>
                    <li>
                        <Checkbox
                            value={true}
                            onClick={() => console.log('checked')}
                        />
                    </li>
                </ul>
            )}
            {type === 'categories' && (
                <ul className={cls(s.items, s[type])}>
                    <li>
                        <Checkbox
                            value={true}
                            onClick={() => console.log('checked')}
                        />
                    </li>
                    <li className={s.item}>{item._id}</li>
                    <li className={s.item}>{item.quantity}</li>
                </ul>
            )}
        </div>
    )
}
