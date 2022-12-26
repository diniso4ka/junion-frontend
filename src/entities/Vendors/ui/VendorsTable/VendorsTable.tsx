import { FC } from 'react'
import s from './VendorsTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { Vendor, VendorsSortType } from '../../model/types/VendorsSchema'
import { useAppDispatch } from '../../../../app/store'
import { vendorsActions } from '../../model/slice/vendorsSlice'
import TableRowLoader from '../../../../shared/ui/LoaderSkeleton/TableRowLoader/TableRowLoader'

interface VendorsTableProps {
    className?: string
    items: Vendor[]
    isLoading?: boolean
}

export const VendorsTable: FC<VendorsTableProps> = ({
    className,
    items,
    isLoading = false,
}) => {
    const dispatch = useAppDispatch()
    const headings = [
        {
            sort: true,
            type: VendorsSortType.VENDOR_CODE,
            value: 'Code',
            onHandleSort: () => dispatch(vendorsActions.sortByCode()),
        },
        {
            sort: true,
            type: VendorsSortType.VENDOR_NAME,
            value: 'Name',
            onHandleSort: () => dispatch(vendorsActions.sortByName()),
        },
        {
            sort: true,
            type: VendorsSortType.VENDOR_REG_CODE,
            value: 'Reg Code',
            onHandleSort: () => dispatch(vendorsActions.sortByRegCode()),
        },
        { sort: false, value: 'Address' },
    ]

    return (
        <div className={cls(s.VendorsTable, className)}>
            <TableHeading type={'vendors'} headings={headings} />
            {isLoading && (
                <div className={s.items}>
                    <TableRowLoader />
                </div>
            )}
            {!isLoading && (
                <div className={s.items}>
                    {items.map(vendor => (
                        <TableRow
                            key={vendor._id}
                            type={'vendors'}
                            item={vendor}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
