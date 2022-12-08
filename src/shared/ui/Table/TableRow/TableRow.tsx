import { FC, useState } from 'react'
import s from './TableRow.module.scss'
import cls from 'classnames'

import { Checkbox } from 'shared/ui/index'
import { DiscountTag } from '../../DiscountTag/DiscountTag'
import { UpdateProductModal } from 'features/UpdateProduct/ui/UpdateProductModal/UpdateProductModal'
import { discountConvertInPercent } from '../../../helpers/math/discountPrice'

interface TableRow {
    className?: string
    type: 'products' | 'vendors' | 'categories'
    item: any
}

export const TableRow: FC<TableRow> = ({ className, type, item }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <div className={cls(s.TableRow, className)}>
            {type === 'products' && (
                <ul
                    onClick={() => setModalIsOpen(true)}
                    className={cls(s.items, s[type])}
                >
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
            {type === 'vendors' && (
                <ul className={cls(s.items, s[type])}>
                    <li className={s.item}>{item.code}</li>
                    <li className={s.item}>{item.name}</li>
                    <li className={s.item}>{item.regCode}</li>
                    <li className={s.item}>{item.address}</li>
                    <li>
                        <Checkbox
                            value={true}
                            onClick={() => console.log('checked')}
                        />
                    </li>
                </ul>
            )}
            {modalIsOpen && (
                <UpdateProductModal
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    item={item}
                />
            )}
        </div>
    )
}
