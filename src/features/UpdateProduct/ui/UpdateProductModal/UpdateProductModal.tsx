import { FC } from 'react'
import { Modal } from 'shared/ui'
import { UpdateProductForm } from '../UpdateProductForm/UpdateProductForm'
import { ProductType } from '../../../../entities/Products/model/types/ProductsSchema'

interface CreateProductModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    item: ProductType
    withCategory?: boolean
    withQuantity?: boolean
    withPrice?: boolean
    withName?: boolean
    withVendor?: boolean
    withDiscountPrice?: boolean
    withUnit?: boolean
    withVendorCode?: boolean
}

export const UpdateProductModal: FC<CreateProductModalProps> = ({
    className,
    isOpen,
    onClose,
    item,
    withCategory = true,
    withQuantity = true,
    withPrice = true,
    withName = true,
    withVendor = true,
    withDiscountPrice = true,
    withUnit = true,
    withVendorCode = true,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <UpdateProductForm
                onClose={onClose}
                item={item}
                withCategory={withCategory}
                withQuantity={withQuantity}
                withPrice={withPrice}
                withName={withName}
                withVendor={withVendor}
                withDiscountPrice={withDiscountPrice}
                withUnit={withUnit}
                withVendorCode={withVendorCode}
            />
        </Modal>
    )
}
