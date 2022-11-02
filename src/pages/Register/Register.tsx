import React from 'react'
import cls from 'classnames'
import s from './Register.module.scss'
import { Button, Input } from '../../components'
import {
    IRegisterReqData,
    IValidationResponseType,
} from '../../shared/helpers/validations/types'
import { registerValidation } from '../../shared/helpers/validations/registerValidation'

const Register = () => {
    const [emailValue, setEmailValue] = React.useState<string>('')
    const [passwordValue, setPasswordValue] = React.useState<string>('')
    const [correctPasswordValue, setCorrectPasswordValue] =
        React.useState<string>('')
    const [usernameValue, setUsernameValue] = React.useState<string>('')
    const [validaionErrors, setValidaionErrors] =
        React.useState<IValidationResponseType>({
            email: '',
            password: '',
            correctPassword: '',
        })
    const [registerData, setRegisterData] = React.useState<IRegisterReqData>({
        email: '',
        password: '',
        correctPassword: '',
        username: '',
    })

    const onSubmitForm = () => {
        const errors = registerValidation({
            email: emailValue,
            password: passwordValue,
            correctPassword: correctPasswordValue,
            username: usernameValue,
        })
        if (errors) {
            setValidaionErrors({
                email: errors.email || undefined,
                password: errors.password || undefined,
                correctPassword: errors.correctPassword || undefined,
                username: errors.username || undefined,
            })
        } else {
            setRegisterData({
                email: emailValue,
                password: passwordValue,
                correctPassword: correctPasswordValue,
                username: usernameValue,
            })
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.formItem}>
                <label className={s.label}>Email Address</label>
                <Input
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    placeHolder={'Set the email address as the login name'}
                    variant={'primary'}
                    type={'text'}
                    helperText={validaionErrors?.email}
                    helperClass={'error'}
                    error={!!validaionErrors?.email}
                />
            </div>
            <div className={s.formItem}>
                <label className={s.label}>Login Password</label>
                <Input
                    onChange={e => setPasswordValue(e.target.value)}
                    value={passwordValue}
                    placeHolder={'Enter the password'}
                    variant={'primary'}
                    type={'password'}
                    helperText={validaionErrors?.password}
                    helperClass={'error'}
                    error={!!validaionErrors?.password}
                />
            </div>
            <div className={s.formItem}>
                <label className={s.label}>Confirm Password</label>
                <Input
                    onChange={e => setCorrectPasswordValue(e.target.value)}
                    value={correctPasswordValue}
                    placeHolder={'Enter the password again'}
                    variant={'primary'}
                    type={'password'}
                    helperText={validaionErrors?.correctPassword}
                    helperClass={'error'}
                    error={!!validaionErrors?.correctPassword}
                />
            </div>
            <div className={s.formItem}>
                <label className={s.label}>Full name</label>
                <Input
                    onChange={e => setUsernameValue(e.target.value)}
                    value={usernameValue}
                    placeHolder={'Enter first and last name'}
                    variant={'primary'}
                    type={'text'}
                    helperText={validaionErrors?.username}
                    helperClass={'error'}
                    error={!!validaionErrors?.username}
                />
            </div>
            <div className={s.formButton}>
                <Button onClick={onSubmitForm} className={s.button}>
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default Register
