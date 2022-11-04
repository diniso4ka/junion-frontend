import React from 'react'
import cls from 'classnames'
import s from './Input.module.scss'

import eye from 'shared/assets/images/password-icons/codicon_eye.svg'
import eyeClosed from 'shared/assets/images/password-icons/codicon_eye-closed.svg'
import { Link } from '../Link'
import { ROUTE_ENTEREMAIL } from 'shared/routes/consts'

interface IInputProps {
    type?: 'text' | 'password'
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: () => void
    onBlur?: () => void
    placeHolder: string
    variant?: 'primary' | 'secondary' | 'outline'
    classname?: string
    helperText?: string
    helperClass?: 'error' | 'hint' | 'success'
    error?: boolean
    forgotPass?: boolean
}

export const Input: React.FC<IInputProps> = React.memo(
    ({
        type = 'text',
        value,
        onChange,
        placeHolder,
        variant = 'primary',
        classname,
        error,
        helperText,
        helperClass = 'hint',
        forgotPass = false,
        onFocus,
        onBlur,
    }) => {
        const [visible, setVisible] = React.useState<boolean>(false)
        const helperTextClass = cls({
            [s.helperError]: helperClass === 'error',
            [s.helperHint]: helperClass === 'hint',
            [s.helperSuccess]: helperClass === 'success',
        })
        const classnames = cls(s.input, s[variant], classname, {
            [s.error]: error,
        })
        const onToggleVisible = () => {
            setVisible(!visible)
        }
        return (
            <div className={s.wrapper}>
                <div className={s.inputWrapper}>
                    <input
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={value}
                        onChange={e => onChange(e)}
                        autoComplete={'off'}
                        type={
                            type === 'text'
                                ? 'text'
                                : type === 'password' && visible
                                ? 'text'
                                : 'password'
                        }
                        className={classnames}
                        placeholder={placeHolder}
                    />
                    <div className={s.rightImage}>
                        {type === 'password' &&
                            (visible ? (
                                <img src={eye} onClick={onToggleVisible} />
                            ) : (
                                <img
                                    src={eyeClosed}
                                    onClick={onToggleVisible}
                                />
                            ))}
                    </div>
                </div>
                <div className={s.helperWrapper}>
                    {helperText ? (
                        <p className={cls(s.helper, helperTextClass)}>
                            {helperText}
                        </p>
                    ) : (
                        <div></div>
                    )}
                    {type === 'password' && forgotPass && (
                        <Link variant={'secondary'} to={ROUTE_ENTEREMAIL}>
                            Forgot you Password?
                        </Link>
                    )}
                </div>
            </div>
        )
    }
)
