import { FC } from 'react'
import { UpdateVendorForm } from '../UpdateVendorForm/UpdateVendorForm'
import { Modal } from 'shared/ui'
import { Vendor } from '../../../../entities/Vendors/model/types/VendorsSchema'

interface UpdateVendorModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    data?: Vendor
}

export const UpdateVendorModal: FC<UpdateVendorModalProps> = ({
    isOpen,
    onClose,
    data,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <UpdateVendorForm onClose={onClose} data={data} />
        </Modal>
    )
}
