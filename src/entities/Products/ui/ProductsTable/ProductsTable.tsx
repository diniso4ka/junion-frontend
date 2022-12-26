import { FC } from 'react'
import s from './ProductsTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { PageLoader } from 'widgets/PageLoader/PageLoader'
import { ProductSortType, ProductType } from '../../model/types/ProductsSchema'
import { productsActions } from '../../model/slice/productsSlice'
import { useDispatch } from 'react-redux'
import TableRowLoader from '../../../../shared/ui/LoaderSkeleton/TableRowLoader/TableRowLoader'

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
    const dispatch = useDispatch()
    const headings = [
        {
            sort: true,
            type: ProductSortType.PRODUCT_CODE,
            value: 'Code',
            onHandleSort: () => dispatch(productsActions.sortByCode()),
        },
        {
            sort: true,
            type: ProductSortType.PRODUCT_CATEGORY,
            value: 'Category',
            onHandleSort: () => dispatch(productsActions.sortByCategory()),
        },
        {
            sort: true,
            type: ProductSortType.PRODUCT_NAME,
            value: 'Name',
            onHandleSort: () => dispatch(productsActions.sortByName()),
        },
        {
            sort: true,
            type: ProductSortType.PRODUCT_PRICE,
            value: 'Price, $',
            onHandleSort: () => dispatch(productsActions.sortByPrice()),
        },
        {
            sort: true,
            type: ProductSortType.PRODUCT_QUANTITY,
            value: 'Quantity',
            onHandleSort: () => dispatch(productsActions.sortByQuantity()),
        },
        {
            sort: true,
            type: ProductSortType.PRODUCT_UNIT,
            value: 'Unit',
            onHandleSort: () => dispatch(productsActions.sortByUnit()),
        },
        { sort: false, value: 'Owner' },
    ]

    return (
        <div className={cls(s.ProductsTable, className)}>
            <TableHeading type={'products'} headings={headings} />
            {isLoading && (
                <div className={s.items}>
                    <TableRowLoader />
                </div>
            )}
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
