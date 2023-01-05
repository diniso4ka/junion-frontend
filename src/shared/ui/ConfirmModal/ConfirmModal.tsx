import { FC } from 'react'
import s from './ConfirmModal.module.scss'
import cls from 'classnames'
import { Button, Modal, Text } from '../index'

interface ConfirmModalProps {
    className?: string
    onClose: () => void
    isOpen: boolean
    isLoading?: boolean
    onConfirm: () => void
    text: string
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
    className,
    onClose,
    isOpen,
    isLoading,
    onConfirm,
    text,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={cls(s.ConfirmModal, className)}
        >
            <div className={s.wrapper}>
                <Text className={s.title} weight={'medium'} subtitle={text} />
                <div className={s.buttons}></div>
                <Button
                    isLoading={isLoading}
                    className={s.button}
                    size={'small'}
                    theme={'purple'}
                    variant={'outline'}
                    onClick={onClose}
                >
                    No
                </Button>
                <Button
                    isLoading={isLoading}
                    onClick={onConfirm}
                    size={'small'}
                    theme={'purple'}
                >
                    Yes
                </Button>
            </div>
        </Modal>
    )
}
