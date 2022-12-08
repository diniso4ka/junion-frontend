import { FC } from 'react'
import { Modal } from 'shared/ui'
import { UpdateProductForm } from '../UpdateProductForm/UpdateProductForm'
import { ProductType } from '../../../../entities/Products/model/types/ProductsSchema'

interface CreateProductModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    item: ProductType
}

export const UpdateProductModal: FC<CreateProductModalProps> = ({
    className,
    isOpen,
    onClose,
    item,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <UpdateProductForm onClose={onClose} item={item} />
        </Modal>
    )
}
