import React, { FC, useState } from 'react'
import s from './VendorsPage.module.scss'
import cls from 'classnames'
import { AdvancedSearch, Button } from 'shared/ui'
import { CreateVendorModal } from 'features/CreateVendor'
import { FilterMenu } from 'features/ProductFilters'
import { getDate } from 'shared/helpers/date/getDate'
import { Text } from 'shared/ui'
import { VendorsTable } from 'entities/Vendors/ui/VendorsTable/VendorsTable'
import { useAppSelector } from 'app/store'
import { getVendorsList } from 'entities/Vendors/model/selectors/getVendorsList/getVendorsList'

const VendorsPage: FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const date = getDate()

    const vendorsList = useAppSelector(getVendorsList)

    return (
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
            <VendorsTable items={vendorsList} />
        </div>
    )
}

export default VendorsPage
