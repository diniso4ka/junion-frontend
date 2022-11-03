import React from 'react'
import cls from 'classnames'
import s from './Login.module.scss'
import { Button, Input } from 'components'

import { loginValidation } from 'shared/helpers/validations/loginValidation'
import {
    IValidationResponseData,
    ILoginReqData,
} from 'shared/helpers/validations/types'
import { useAppDispatch, useAppSelector } from '../../store/types'
import { thunkFetchLogin } from '../../store/slices/user/userSlice'

const Login: React.FC = () => {
    const [emailValue, setEmailValue] = React.useState<string>('')
    const [passwordValue, setPasswordValue] = React.useState<string>('')
    const [errorMessage, setErrorMessage] = React.useState<string>('')
    const [validaionErrors, setValidaionErrors] =
        React.useState<IValidationResponseData | null>()
    const [loginData, setLoginData] = React.useState<ILoginReqData | null>()

    const dispatch = useAppDispatch()
    const { incorrect } = useAppSelector(state => state.user.errors)

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
            setValidaionErrors({
                email: '',
                password: '',
            })
            setLoginData({
                email: emailValue,
                password: passwordValue,
            })
        }
    }

    React.useEffect(() => {
        if (loginData) {
            dispatch(
                thunkFetchLogin({
                    email: 'fewsfdwfe@mail.ru',
                    password: '123',
                })
            )
        }
    }, [loginData])

    return (
        <main className={s.wrapper}>
            <div className={s.message}>
                <p className={cls(s.helper, s.helperError)}>{incorrect}</p>
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
