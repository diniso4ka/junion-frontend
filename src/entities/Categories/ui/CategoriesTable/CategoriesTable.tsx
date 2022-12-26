import { FC } from 'react'
import s from './CategoriesTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { Category } from '../../model/types/CategoriesSchema'
import TableRowLoader from 'shared/ui/LoaderSkeleton/TableRowLoader/TableRowLoader'

interface CategoriesTableProps {
    className?: string
    items: Category[]
    isLoading?: boolean
}

export const CategoriesTable: FC<CategoriesTableProps> = ({
    className,
    items,
    isLoading = false,
}) => {
    const headings = [
        { sort: true, value: 'Category' },
        { sort: true, value: 'Quantity' },
    ]

    return (
        <div className={cls(s.CategoriesTable, className)}>
            <TableHeading type={'categories'} headings={headings} />
            {isLoading ? (
                <TableRowLoader />
            ) : (
                <div className={s.items}>
                    {items.map(category => (
                        <TableRow
                            key={category._id}
                            type={'categories'}
                            item={category}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
