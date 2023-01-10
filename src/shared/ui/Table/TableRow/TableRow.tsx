import { FC, useState } from 'react'
import s from './TableRow.module.scss'
import cls from 'classnames'

import { Checkbox } from 'shared/ui/index'
import { DiscountTag } from '../../DiscountTag/DiscountTag'
import { discountConvertInPercent } from '../../../helpers/math/discountPrice'

interface TableRow {
    className?: string
    type: 'products' | 'vendors' | 'categories'
    selected?: boolean
    onSelect?: (item) => void
    item: any
}

export const TableRow: FC<TableRow> = ({
    className,
    type,
    item,
    selected,
    onSelect,
}) => {
    return (
        <div
            className={cls(s.TableRow, className, {
                [s.active]: selected,
            })}
        >
            {type === 'products' && (
                <ul className={cls(s.items, s[type])}>
                    <li>
                        <Checkbox
                            value={selected}
                            onClick={() => onSelect(item)}
                        />
                    </li>
                    <li className={s.item}>{`${item.vendor}-${item.art}`}</li>
                    <li className={s.item}>{item.category[0]}</li>
                    <li className={s.item}>{item.name}</li>
                    <li className={s.item}>
                        {Number(
                            discountConvertInPercent(
                                item.price,
                                item.discountPrice
                            )
                        ) > 0 &&
                        discountConvertInPercent(
                            item.price,
                            item.discountPrice
                        ) < 100 ? (
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
                    <li className={s.item} title={item.owner}>
                        {item.owner}
                    </li>
                </ul>
            )}
            {type === 'categories' && (
                <ul className={cls(s.items, s[type])}>
                    <li className={s.item}>{item._id}</li>
                    <li className={s.item}>{item.quantity}</li>
                </ul>
            )}
            {type === 'vendors' && (
                <ul className={cls(s.items, s[type])}>
                    <li>
                        <Checkbox
                            value={selected}
                            onClick={() => onSelect(item)}
                        />
                    </li>
                    <li className={s.item}>{item.code}</li>
                    <li className={s.item}>{item.name}</li>
                    <li className={s.item}>{item.regCode}</li>
                    <li className={s.item}>{item.address}</li>
                </ul>
            )}
        </div>
    )
}
