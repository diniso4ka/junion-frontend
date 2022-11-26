import React, { FC, InputHTMLAttributes, useState } from 'react'
import s from './Search.module.scss'
import cls from 'classnames'

import searchIcon from 'shared/assets/images/icons/search.svg'
import deleteIcon from 'shared/assets/images/icons/delete.svg'
import moreIcon from 'shared/assets/images/icons/more.svg'
import { DroppedMenu } from 'components'
import { FilterMenu } from 'pages/Private/Products/FilterMenu/FilterMenu'

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    onClick?: (e) => void
    toggleOpen?: () => void
    type: 'hint' | 'filters'
    data?: string[]
    isOpened?: boolean
    onClear?: () => void
    canClear?: boolean
}

export const Search: FC<SearchProps> = ({
    className,
    type,
    isOpened,
    onClear,
    canClear,
    toggleOpen,
    onClick,
    data,
    ...rest
}) => {
    const [value, setValue] = useState('')
    const [focus, setFocus] = useState(false)

    return (
        <div onClick={onClick} className={cls(s.wrapper, className)}>
            <input
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={e => setValue(e.target.value)}
                className={s.input}
                {...rest}
            />
            <img
                className={cls(s.helperIcon, s.helperIconLeft)}
                src={searchIcon}
            />
            <img
                className={cls(s.helperIcon, s.helperIconRight, {
                    [s.active]: isOpened,
                })}
                src={moreIcon}
                onClick={toggleOpen}
            />
            {canClear && (
                <img
                    className={cls(s.helperIcon, s.helperSecondIconLeft)}
                    src={deleteIcon}
                    onClick={onClear}
                />
            )}
            {type === 'filters' && (
                <DroppedMenu
                    className={s.droppedMenu}
                    size={'large'}
                    isOpened={isOpened}
                >
                    <FilterMenu onClose={toggleOpen} onClear={onClear} />
                </DroppedMenu>
            )}
            {type === 'hint' && (
                <DroppedMenu
                    className={s.droppedMenu}
                    size={'large'}
                    isOpened={true}
                >
                    <ul className={s.hint}>
                        {data
                            .filter(item =>
                                item.toLowerCase().includes(value.toLowerCase())
                            )
                            .map((item, index) => (
                                <li
                                    key={index}
                                    onClick={e => console.log(e.target)}
                                    className={s.hintItem}
                                >
                                    {item}
                                </li>
                            ))}
                    </ul>
                </DroppedMenu>
            )}
        </div>
    )
}
