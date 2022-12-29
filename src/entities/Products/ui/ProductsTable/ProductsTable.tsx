import { FC } from 'react'
import s from './ProductsTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { ProductSortType, ProductType } from '../../model/types/ProductsSchema'
import { productsActions } from '../../model/slice/productsSlice'
import TableRowLoader from '../../../../shared/ui/LoaderSkeleton/TableRowLoader/TableRowLoader'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { getUpdateProductSelectedList } from '../../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList'
import { updateProductActions } from '../../../../features/UpdateProduct/model/slice/updateProductSlice'

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
    const dispatch = useAppDispatch()
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

    const selectedItems = useAppSelector(getUpdateProductSelectedList)

    const onHandleSelect = item => {
        dispatch(updateProductActions.selectProduct(item))
    }
    const allSelected =
        selectedItems.length === items?.length && !!items?.length
    const onHandleMultiSelect = () => {
        if (allSelected) {
            dispatch(updateProductActions.clearSelect())
        } else {
            items.forEach(item => {
                if (!selectedItems.find(product => item._id === product._id)) {
                    dispatch(updateProductActions.selectProduct(item))
                }
            })
        }
    }

    return (
        <div className={cls(s.ProductsTable, className)}>
            <TableHeading
                type={'products'}
                headings={headings}
                onSelect={onHandleMultiSelect}
                selected={allSelected}
            />
            {isLoading && (
                <div className={s.items}>
                    <TableRowLoader />
                </div>
            )}
            {!isLoading && (
                <div className={s.items}>
                    {items.map(product => (
                        <TableRow
                            selected={
                                !!selectedItems.find(
                                    item => item._id === product._id
                                )
                            }
                            onSelect={onHandleSelect}
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
