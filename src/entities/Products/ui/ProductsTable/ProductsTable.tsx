import { FC } from 'react'
import s from './ProductsTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { PageLoader } from 'widgets/PageLoader/PageLoader'
import { ProductType } from '../../model/types/ProductsSchema'

interface ProductsTableProps {
    className?: string
    items: ProductType[]
    isLoading?: boolean
}

export const ProductsTable: FC<ProductsTableProps> = ({
    className,
    items,
    isLoading = false,
}) => {
    const headings = [
        { sort: true, value: 'Code' },
        { sort: true, value: 'Category' },
        { sort: true, value: 'Name' },
        { sort: true, value: 'Price, $' },
        { sort: true, value: 'Quantity' },
        { sort: true, value: 'Unit' },
        { sort: false, value: 'Owner' },
    ]

    return (
        <div className={cls(s.ProductsTable, className)}>
            <TableHeading type={'products'} headings={headings} />
            {isLoading && <PageLoader />}
            {!isLoading && (
                <div className={s.items}>
                    {items.map(product => (
                        <TableRow
                            key={product._id}
                            type={'products'}
                            item={product}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
