import { FC } from 'react'
import s from './RetrievePasswordModal.module.scss'
import cls from 'classnames'
import { Modal } from 'shared/ui'
import { EnterMailForm } from '../EnterMailForm/EnterMailForm'

interface RetrievePasswordModalProps {
    className?: string
    onClose: () => void
    isOpen: boolean
}

export const RetrievePasswordModal: FC<RetrievePasswordModalProps> = ({
    className,
    onClose,
    isOpen,
}) => {
    return (
        <Modal
            closeIcon={true}
            overlay={false}
            position={'top'}
            onClose={onClose}
            isOpen={isOpen}
        >
            <EnterMailForm />
        </Modal>
    )
}
