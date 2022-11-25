import { FC, InputHTMLAttributes, useState } from 'react'
import s from './Search.module.scss'
import cls from 'classnames'

import searchIcon from 'shared/assets/images/icons/search.svg'
import deleteIcon from 'shared/assets/images/icons/delete.svg'
import moreIcon from 'shared/assets/images/icons/more.svg'
import { DroppedMenu } from 'components'
import { FilterMenu } from 'pages/Private/Products/FilterMenu/FilterMenu'

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    onFilterOpen?: () => void
    onClear?: () => void
    canClear?: boolean
    isOpened?: boolean
    onClick?: (e) => void
    withFilter?: boolean
}

export const Search: FC<SearchProps> = ({
    withFilter,
    className,
    onFilterOpen,
    isOpened,
    onClear,
    canClear,
    onClick,
    ...rest
}) => {
    return (
        <div onClick={onClick} className={cls(s.wrapper, className)}>
            <input className={s.input} {...rest} />
            <img
                className={cls(s.helperIcon, s.helperIconLeft)}
                src={searchIcon}
            />
            <img
                className={cls(s.helperIcon, s.helperIconRight, {
                    [s.active]: isOpened,
                })}
                src={moreIcon}
                onClick={onFilterOpen}
            />
            {canClear && (
                <img
                    className={cls(s.helperIcon, s.helperSecondIconLeft)}
                    src={deleteIcon}
                    onClick={onClear}
                />
            )}
            <DroppedMenu
                className={s.droppedMenu}
                size={'large'}
                isOpened={isOpened}
            >
                {withFilter && (
                    <FilterMenu onClose={onFilterOpen} onClear={onClear} />
                )}
            </DroppedMenu>
        </div>
    )
}
