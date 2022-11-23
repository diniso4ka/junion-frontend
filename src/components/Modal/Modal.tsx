import { FC, ReactNode } from 'react'
import s from './Modal.module.scss'
import cls from 'classnames'

interface ModalProps {
    className?: string
    children: ReactNode
}

export const Modal: FC<ModalProps> = ({ className, children }) => {
    return (
        <div className={cls(s.wrapper, className)}>
            <div className={s.Modal}>{children}</div>
        </div>
    )
}
