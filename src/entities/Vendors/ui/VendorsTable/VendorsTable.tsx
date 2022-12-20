import { FC } from 'react'
import s from './VendorsTable.module.scss'
import cls from 'classnames'
import { TableHeading, TableRow } from 'shared/ui'
import { IVendorsResData } from 'shared/types/vendors'

interface VendorsTableProps {
    className?: string
    items: IVendorsResData[]
    isLoading?: boolean
}

export const VendorsTable: FC<VendorsTableProps> = ({
    className,
    items,
    isLoading = false,
}) => {
    const headings = [
        { sort: true, value: 'Code' },
        { sort: true, value: 'Name' },
        { sort: true, value: 'Reg Code' },
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
