import { FC, useEffect } from 'react'
import s from './TableHeading.module.scss'
import cls from 'classnames'

import { ReactComponent as Arrow } from 'shared/assets/images/icons/arrowDown.svg'
import { Checkbox } from '../../Checkbox'
import { useAppSelector } from '../../../../app/store'
import { getProductsSortedBy } from '../../../../entities/Products/model/selectors/getProductsSortedBy/getProductsSortedBy'
import { ProductSort } from '../../../../entities/Products/model/types/ProductsSchema'
import { getVendorsSortedBy } from '../../../../entities/Vendors'
import { VendorsSort } from '../../../../entities/Vendors/model/types/VendorsSchema'
import { CategoriesSort } from '../../../../entities/Categories/model/types/CategoriesSchema'
import { getCategorySortedBy } from '../../../../entities/Categories'

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
    const sortedByProducts = useAppSelector(getProductsSortedBy)
    const sortedByVendors = useAppSelector(getVendorsSortedBy)
    const sortedByCategory = useAppSelector(getCategorySortedBy)
    console.log(sortedByVendors)
    useEffect(() => {
        console.log(sortedByVendors)
    }, [sortedByVendors])
    return (
        <div className={cls(s.TableHeading, className)}>
            {type === 'products' && (
                <ul className={cls(s.items, s[type])}>
                    <li>
                        <Checkbox
                            value={true}
                            onClick={() => console.log('checked')}
                            theme={'dark'}
                        />
                    </li>
                    {headings.map(item => (
                        <li key={item.value} className={s.item}>
                            {item.value}
                            {item.sort && (
                                <Arrow
                                    onClick={() => item?.onHandleSort?.()}
                                    className={cls(s.sortIcon, {
                                        [s.activeArrow]:
                                            item.type === sortedByProducts.type,
                                        [s.sortAsc]:
                                            item.type ===
                                                sortedByProducts.type &&
                                            sortedByProducts.sort ===
                                                ProductSort.DESC,
                                    })}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {type === 'categories' && (
                <ul className={cls(s.items, s[type])}>
                    <li>
                        <Checkbox
                            theme={'dark'}
                            value={true}
                            onClick={() => console.log('checked')}
                        />
                    </li>
                    {headings.map(item => (
                        <li key={item.value} className={s.item}>
                            {item.value}
                            {item.sort && (
                                <Arrow
                                    onClick={() => item?.onHandleSort?.()}
                                    className={cls(s.sortIcon, {
                                        [s.activeArrow]:
                                            item.type === sortedByCategory.type,
                                        [s.sortAsc]:
                                            item.type ===
                                                sortedByCategory.type &&
                                            sortedByCategory.sort ===
                                                CategoriesSort.DESC,
                                    })}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {type === 'vendors' && (
                <ul className={cls(s.items, s[type])}>
                    <li>
                        <Checkbox
                            theme={'dark'}
                            value={true}
                            onClick={() => console.log('checked')}
                        />
                    </li>
                    {headings.map(item => (
                        <li key={item.value} className={s.item}>
                            {item.value}
                            {item.sort && (
                                <Arrow
                                    onClick={() => item?.onHandleSort?.()}
                                    className={cls(s.sortIcon, {
                                        [s.activeArrow]:
                                            item.type === sortedByVendors.type,
                                        [s.sortAsc]:
                                            item.type ===
                                                sortedByVendors.type &&
                                            sortedByVendors.sort ===
                                                VendorsSort.DESC,
                                    })}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
