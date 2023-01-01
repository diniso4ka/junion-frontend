import React, { FC, useEffect, useState } from 'react'
import s from './VendorsPage.module.scss'
import { AdvancedSearch, Button } from 'shared/ui'
import { CreateVendorModal } from 'features/CreateVendor'
import { FilterMenu, productFiltersActions } from 'features/ProductFilters'
import { getDate } from 'shared/helpers/date/getDate'
import { Text } from 'shared/ui'
import { VendorsTable } from 'entities/Vendors/ui/VendorsTable/VendorsTable'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getVendorsList } from 'entities/Vendors/model/selectors/getVendorsList/getVendorsList'

import { getVendorsFilteredList } from '../../../entities/Vendors/model/selectors/getVendorsFilteredList/getVendorsFilteredList'
import { getVendorsStatus, vendorsActions } from '../../../entities/Vendors'
import { SideButton } from '../../../shared/ui/SideButton'

import { getVendorsError } from 'entities/Vendors/model/selectors/getVendorsError/getVendorsError'
import { searchVendorsByIncludes } from '../../../shared/helpers/filters/search'

const VendorsPage: FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')

    const date = getDate()
    const dispatch = useAppDispatch()
    const vendorsList = useAppSelector(getVendorsList)
    const status = useAppSelector(getVendorsStatus)
    const error = useAppSelector(getVendorsError)
    const vendorsFilteredList = useAppSelector(getVendorsFilteredList)
    const filteredItems = searchVendorsByIncludes(
        vendorsFilteredList ? vendorsFilteredList : vendorsList,
        searchValue
    ).reverse()
    const onClear = () => {
        setSearchValue('')
    }
    useEffect(() => {
        return () => {
            dispatch(vendorsActions.clearSort())
        }
    }, [])
    return (
        <div className={s.VendorsPage}>
            <div className={s.header}>
                <Text className={s.title} title='Vendors' />
                <AdvancedSearch
                    value={searchValue}
                    onChange={e => setSearchValue(e)}
                    onClick={e => e.stopPropagation()}
                    canClear={!!searchValue}
                    onClear={() => onClear()}
                >
                    <FilterMenu />
                </AdvancedSearch>
                <Button
                    onClick={() => setModalIsOpen(true)}
                    variant={'rounded'}
                    theme={'orange'}
                >
                    Add new vendor
                </Button>
                <Text
                    className={s.date}
                    date={`${date.mounth} ${date.number}, ${date.year}`}
                />
            </div>
            <VendorsTable
                isLoading={status}
                error={!!error}
                items={filteredItems}
            />
            <div className={s.btns}>
                <SideButton variant='update' className={s.update} />
                <SideButton variant='delete' className={s.delete} />
            </div>
            {modalIsOpen && (
                <CreateVendorModal
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                />
            )}
        </div>
    )
}

export default VendorsPage
