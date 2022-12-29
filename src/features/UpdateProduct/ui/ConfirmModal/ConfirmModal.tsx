import { FC } from 'react'
import s from './ConfirmModal.module.scss'
import cls from 'classnames'
import { Button, Modal, Text } from '../../../../shared/ui'

interface ConfirmModalProps {
    className?: string
    onClose: () => void
    isOpen: boolean
    onConfirm: () => void
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
    className,
    onClose,
    isOpen,
    onConfirm,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={cls(s.ConfirmModal, className)}
        >
            <div className={s.wrapper}>
                <Text
                    className={s.title}
                    weight={'medium'}
                    subtitle={'Do you really want to remove it?'}
                />
                <div className={s.buttons}></div>
                <Button
                    className={s.button}
                    size={'small'}
                    theme={'purple'}
                    variant={'outline'}
                    onClick={onClose}
                >
                    No
                </Button>
                <Button onClick={onConfirm} size={'small'} theme={'purple'}>
                    Yes
                </Button>
            </div>
        </Modal>
    )
}
