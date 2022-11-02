import React from 'react'
import cls from 'classnames'
import s from './Login.module.scss'
import { Button, Input } from 'components'
import { ILoginData } from './types'
import { loginValidation } from '../../shared/helpers/validations/loginValidation'
import { IValidationResponseType } from '../../shared/helpers/validations/types'

const Login = () => {
    const [emailValue, setEmailValue] = React.useState<string>('test@test.test')
    const [passwordValue, setPasswordValue] =
        React.useState<string>('Test1textfe%')

    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [validaionErrors, setValidaionErrors] =
        React.useState<IValidationResponseType>({
            email: '',
            password: '',
        })
    const [loginData, setLoginData] = React.useState<ILoginData>({
        email: '',
        password: '',
    })

    const onSubmitForm = () => {
        const errors = loginValidation({
            email: emailValue,
            password: passwordValue,
        })
        if (errors) {
            setValidaionErrors({
                email: errors.email || undefined,
                password: errors.password || undefined,
            })
        } else {
            setLoginData({
                email: emailValue,
                password: passwordValue,
            })
            setTimeout(
                () =>
                    setErrorMessage(
                        'Your account name or password is incorrect'
                    ),
                2000
            )
        }
    }

    return (
        <main className={s.wrapper}>
            <div className={s.message}>
                <p className={cls(s.helper, s.helperError)}>{errorMessage}</p>
            </div>
            <div className={s.formItem}>
                <Input
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    placeHolder={'E-mail address'}
                    variant={'primary'}
                    type={'text'}
                    helperText={validaionErrors?.email}
                    helperClass={'error'}
                    error={!!validaionErrors?.email}
                />
            </div>
            <div className={s.formItem}>
                <Input
                    onChange={e => setPasswordValue(e.target.value)}
                    value={passwordValue}
                    placeHolder={'Password'}
                    variant={'primary'}
                    type={'password'}
                    helperText={validaionErrors?.password}
                    helperClass={'error'}
                    error={!!validaionErrors?.password}
                    forgotPass={true}
                />
            </div>
            <div className={s.formButton}>
                <Button onClick={onSubmitForm} className={s.button}>
                    Log In
                </Button>
            </div>
        </main>
    )
}

export default Login
