import { FC } from 'react'
import s from './CategoriesTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import TableRowLoader from 'shared/ui/LoaderSkeleton/TableRowLoader/TableRowLoader'
import {
    CategoriesSortType,
    Category,
} from '../../model/types/CategoriesSchema'
import { useAppDispatch } from '../../../../app/store'
import { categoriesActions } from '../../model/slice/categoriesSlice'

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
    const dispatch = useAppDispatch()
    const headings = [
        {
            sort: true,
            type: CategoriesSortType.CATEGORY_CATEGORY,
            value: 'Category',
            onHandleSort: () => dispatch(categoriesActions.sortByCategory()),
        },
        {
            sort: true,
            type: CategoriesSortType.CATEGORY_QUANTITY,
            value: 'Quantity',
            onHandleSort: () => dispatch(categoriesActions.sortByQuantity()),
        },
    ]

    return (
        <div className={cls(s.CategoriesTable, className)}>
            <TableHeading type={'categories'} headings={headings} />
            {isLoading && (
                <div className={s.items}>
                    <TableRowLoader />
                </div>
            )}
            {!isLoading && (
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
