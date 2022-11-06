import React, { InputHTMLAttributes } from 'react'
import cls from 'classnames'
import s from './Input.module.scss'

import eye from 'shared/assets/images/password-icons/codicon_eye.svg'
import eyeClosed from 'shared/assets/images/password-icons/codicon_eye-closed.svg'
import { Link } from '../Link'
import { routeConfig } from '../../shared/config/routeConfig/routeConfig'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: 'text' | 'password'
    placeHolder: string
    variant?: 'primary' | 'secondary' | 'outline'
    sizeContainer?: 'primary' | 'secondary'
    classname?: string
    helperText?: string
    helperClass?: 'error' | 'hint' | 'success'
    error?: boolean
    forgotPass?: boolean
}

export const Input: React.FC<IInputProps> = React.memo(
    ({
        type = 'text',
        variant = 'primary',
        sizeContainer = 'primary',
        classname,
        error = 'error',
        helperText,
        helperClass = 'error',
        forgotPass = false,
        ...rest
    }) => {
        const [visible, setVisible] = React.useState<boolean>(false)
        const helperTextClass = cls({
            [s.helperError]: helperClass === 'error',
            [s.helperHint]: helperClass === 'hint',
            [s.helperSuccess]: helperClass === 'success',
        })
        const classnames = cls(
            s.input,
            s[variant],
            s[sizeContainer],
            classname,
            {
                [s.error]: error,
            }
        )
        const onToggleVisible = () => {
            setVisible(!visible)
        }
        return (
            <div className={s.wrapper}>
                <div className={s.inputWrapper}>
                    <input
                        onChange={e => rest.onChange(e)}
                        autoComplete={'off'}
                        type={
                            type === 'text'
                                ? 'text'
                                : type === 'password' && visible
                                ? 'text'
                                : 'password'
                        }
                        className={classnames}
                        {...rest}
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
                        <Link variant={'secondary'} to={routeConfig.ENTEREMAIL}>
                            Forgot you Password?
                        </Link>
                    )}
                </div>
            </div>
        )
    }
)
