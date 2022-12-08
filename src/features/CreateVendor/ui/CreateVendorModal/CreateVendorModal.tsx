import { FC } from 'react'
import { CreateVendorForm } from '../CreateVendorForm/CreateVendorForm'
import { Modal } from 'shared/ui'

interface CreateProductModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const CreateVendorModal: FC<CreateProductModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CreateVendorForm onClose={onClose} />
        </Modal>
    )
}
