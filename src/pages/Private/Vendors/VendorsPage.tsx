import React, { FC, useEffect, useState } from 'react'
import s from './VendorsPage.module.scss'
import { AdvancedSearch, Button } from 'shared/ui'
import { CreateVendorModal } from 'features/CreateVendor'
import { FilterMenu } from 'features/ProductFilters'
import { getDate } from 'shared/helpers/date/getDate'
import { Text } from 'shared/ui'
import { VendorsTable } from 'entities/Vendors/ui/VendorsTable/VendorsTable'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getVendorsList } from 'entities/Vendors/model/selectors/getVendorsList/getVendorsList'

import { getVendorsFilteredList } from '../../../entities/Vendors/model/selectors/getVendorsFilteredList/getVendorsFilteredList'
import { vendorsActions } from '../../../entities/Vendors'
import { SideButton } from '../../../shared/ui/SideButton'

import { getVendorsError } from 'entities/Vendors/model/selectors/getVendorsError/getVendorsError'

const VendorsPage: FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const date = getDate()
    const dispatch = useAppDispatch()
    const vendorsList = useAppSelector(getVendorsList)
    const error = useAppSelector(getVendorsError)
    const vendorsFilteredList = useAppSelector(getVendorsFilteredList)
    useEffect(() => {
        return () => {
            dispatch(vendorsActions.clearSort())
        }
    }, [])
    return (
        <div className={s.overlay}>
            <div className={s.VendorsPage}>
                <div className={s.header}>
                    <Text className={s.title} title='Vendors' />
                    <AdvancedSearch>
                        <FilterMenu />
                    </AdvancedSearch>
                    <Button
                        onClick={() => setModalIsOpen(true)}
                        variant={'rounded'}
                        theme={'orange'}
                    >
                        Add new vendor
                    </Button>
                    {modalIsOpen && (
                        <CreateVendorModal
                            isOpen={modalIsOpen}
                            onClose={() => setModalIsOpen(false)}
                        />
                    )}
                    <Text
                        className={s.date}
                        date={`${date.mounth} ${date.number}, ${date.year}`}
                    />
                </div>
                <VendorsTable items={vendorsFilteredList || vendorsList} />
            </div>
            <div className={s.btns}>
                <SideButton variant='update' className={s.update} />
                <SideButton variant='delete' className={s.delete} />
            </div>
        </div>
    )
}

export default VendorsPage
