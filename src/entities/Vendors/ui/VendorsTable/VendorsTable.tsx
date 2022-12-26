import { FC } from 'react'
import s from './VendorsTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { Vendor, VendorsSortType } from '../../model/types/VendorsSchema'
import { useAppDispatch } from '../../../../app/store'
import { vendorsActions } from '../../model/slice/vendorsSlice'

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

    if (isLoading) {
        return <div>...loading</div>
    }
    return (
        <div className={cls(s.VendorsTable, className)}>
            <TableHeading type={'vendors'} headings={headings} />
            <div className={s.items}>
                {items.map(vendor => (
                    <TableRow key={vendor._id} type={'vendors'} item={vendor} />
                ))}
            </div>
        </div>
    )
}
