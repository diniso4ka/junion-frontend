import { FC } from 'react'
import s from './ProductsTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { IProductsResData } from 'shared/types/products'

interface ProductsTableProps {
    className?: string
    items: IProductsResData[]
}

export const ProductsTable: FC<ProductsTableProps> = ({ className, items }) => {
    const headings = [
        { sort: true, value: 'Code' },
        { sort: true, value: 'Category' },
        { sort: true, value: 'Name' },
        { sort: true, value: 'Price, $' },
        { sort: true, value: 'Quantity' },
        { sort: true, value: 'Unit' },
        { sort: false, value: 'Owner' },
        { sort: false, value: 'Action' },
    ]
    return (
        <div className={cls(s.ProductsTable, className)}>
            <TableHeading type={'products'} headings={headings} />
            <div className={s.items}>
                {items.map(product => (
                    <TableRow
                        key={product._id}
                        type={'products'}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}
