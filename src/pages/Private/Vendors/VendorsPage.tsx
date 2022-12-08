import React, { FC, useState } from 'react'
import s from './VendorsPage.module.scss'
import cls from 'classnames'
import { Button } from 'shared/ui'
import { CreateVendorModal } from '../../../features/CreateVendor'

const VendorsPage: FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return (
        <div className={cls(s.VendorsPage, s.wrapper)}>
            <Button onClick={() => setModalIsOpen(true)} variant={'rounded'}>
                Add new vendor
            </Button>
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
