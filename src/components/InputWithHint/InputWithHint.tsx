import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import s from './InputWithHint.module.scss'

import { DroppedMenu } from '../DroppedMenu'
import { useClickOutside } from 'shared/hooks/useClickOutside'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    classname?: string
    hint?: string[] | null
    isHintOpen?: boolean
    onCloseHint?: () => void
    onHandleSelect?: (hint: string) => void
}

export const InputWithHint: React.FC<IInputProps> = React.memo(
    ({
        type = 'text',
        hint,
        classname,
        onCloseHint,
        isHintOpen,
        onHandleSelect,
        ...rest
    }) => {
        const [value, setValue] = useState('')
        const ref = useRef()
        useClickOutside(ref, () => onCloseHint())
        const filtredItems = hint.filter(item => {
            return item.toLowerCase().includes(value.toLowerCase())
        })
        const onHandleHint = e => {
            onHandleSelect(e.target.innerHTML)
            onCloseHint()
        }
        useEffect(() => {
            if (rest.value) {
                // @ts-ignore
                setValue(rest.value)
            } else {
                setValue('')
            }
        }, [rest.value])
        return (
            <div ref={ref} className={s.wrapper}>
                <div className={s.inputWrapper}>
                    <input
                        className={s.input}
                        onChange={e => rest.onChange(e)}
                        autoComplete={'off'}
                        type={'text'}
                        {...rest}
                    />
                    <DroppedMenu
                        position={'left'}
                        size={'medium'}
                        isOpened={isHintOpen}
                    >
                        <ul className={s.hint}>
                            {filtredItems.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={onHandleHint}
                                    className={s.hintItem}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </DroppedMenu>
                </div>
            </div>
        )
    }
)
