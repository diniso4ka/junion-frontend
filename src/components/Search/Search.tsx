import { FC, InputHTMLAttributes, useState } from 'react'
import s from './Search.module.scss'
import cls from 'classnames'

import searchIcon from 'shared/assets/images/icons/search.svg'
import moreIcon from 'shared/assets/images/icons/more.svg'
import { DroppedMenu } from 'components'
import { FilterMenu } from 'features/DroppedMenuContent/FilterMenu/FilterMenu'

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    onFilterOpen: () => void
    isOpened: boolean
    onClick: (e) => void
}

export const Search: FC<SearchProps> = ({
    className,
    onFilterOpen,
    isOpened,
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
            <DroppedMenu
                className={s.droppedMenu}
                size={'large'}
                isOpened={isOpened}
            >
                <FilterMenu setIsOpen={onFilterOpen} />
            </DroppedMenu>
        </div>
    )
}
