import { FC, ReactNode, useEffect } from 'react'
import s from './Modal.module.scss'
import cls from 'classnames'
import { Portal } from 'shared/ui/index'

interface ModalProps {
    className?: string
    children: ReactNode
    onClose: () => void
    isOpen: boolean
}

export const Modal: FC<ModalProps> = ({
    className,
    children,
    isOpen,
    onClose,
}) => {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Escape') {
                e.preventDefault()
                onClose()
            }
        }
        document.addEventListener('keydown', listener)
        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [])
    return (
        <Portal>
            <div
                onClick={() => onClose()}
                className={cls(s.wrapper, className, {
                    [s.opened]: isOpen,
                })}
            >
                <div onClick={e => e.stopPropagation()} className={s.Modal}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}
