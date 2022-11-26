import React, {
    FC,
    InputHTMLAttributes,
    ReactNode,
    useRef,
    useState,
} from 'react'
import s from './AdvancedSearch.module.scss'
import cls from 'classnames'

import searchIcon from 'shared/assets/images/icons/search.svg'
import deleteIcon from 'shared/assets/images/icons/delete.svg'
import moreIcon from 'shared/assets/images/icons/more.svg'
import { useClickOutside } from '../../shared/hooks/useClickOutside'

interface AdvancedSearchProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    children?: ReactNode
    isOpened?: boolean
    onClick?: (e) => void
    onChange?: (e) => void
    onOpen?: () => void
    onClose?: () => void
    onToggleOpen?: () => void
    onClear?: () => void
    canClear?: boolean
    value?: string
}

export const AdvancedSearch: FC<AdvancedSearchProps> = ({
    className,
    children,
    isOpened,
    onClick,
    onOpen,
    onClose,
    onToggleOpen,
    onClear,
    canClear,
    onChange,
    value,
    ...rest
}) => {
    const [focus, setFocus] = useState(false)
    const ref = useRef(null)
    useClickOutside(ref, () => onClose())
    return (
        <div ref={ref} onClick={onClick} className={cls(s.wrapper, className)}>
            <input
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={e => onChange(e.target.value)}
                className={s.input}
                {...rest}
            />
            <div
                className={cls(s.children, {
                    [s.opened]: isOpened,
                })}
            >
                {children}
            </div>
            <img
                className={cls(s.helperIcon, s.helperIconLeft)}
                src={searchIcon}
            />
            <img
                className={cls(s.helperIcon, s.helperIconRight, {
                    [s.active]: isOpened,
                })}
                src={moreIcon}
                onClick={() => onToggleOpen()}
            />
            {canClear && (
                <img
                    className={cls(s.helperIcon, s.helperSecondIconLeft)}
                    src={deleteIcon}
                    onClick={onClear}
                />
            )}
        </div>
    )
}