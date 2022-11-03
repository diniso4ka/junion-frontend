import React from 'react'
import cls from 'classnames'
import s from './Register.module.scss'
import { Button, Input } from '../../components'
import {
    IRegisterReqData,
    IValidationResponseData,
} from 'shared/helpers/validations/types'
import {
    correctPasswordValidation,
    passwordValidation,
    registerValidation,
} from 'shared/helpers/validations/registerValidation'
import { useAppDispatch } from 'store/types'
import { thunkFetchRegister } from 'store/slices/user/userSlice'
import { useNavigate } from 'react-router'
import * as routes from 'shared/config/consts'
import { passwordValidationMessages } from '../../shared/helpers/validations/messages'

const Register = () => {
    const [validaionErrors, setValidaionErrors] =
        React.useState<IValidationResponseData | null>()
    const [passwordFocus, setPasswordFocus] = React.useState(false)
    const [submitForm, setSubmitForm] = React.useState(false)
    const [registerData, setRegisterData] =
        React.useState<IRegisterReqData | null>()
    const [registerValue, setRegisterValue] = React.useState<IRegisterReqData>({
        email: '',
        password: '',
        correctPassword: '',
        name: '',
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmitForm = async () => {
        setSubmitForm(true)
        const errors = registerValidation(registerValue)
        if (errors) {
            setValidaionErrors({ ...errors })
        } else {
            setValidaionErrors(null)
            await setRegisterData(registerValue)
            await navigate(routes.ROUTE_LOGIN)
        }
    }
    React.useEffect(() => {
        if (registerData) {
            dispatch(thunkFetchRegister(registerData))
        }
    }, [registerData])

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterValue(prev => ({
            ...prev,
            password: e.target.value,
        }))
    }
    const onCorrectPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRegisterValue(prev => ({
            ...prev,
            correctPassword: e.target.value,
        }))
    }

    React.useEffect(() => {
        const error = passwordValidation(registerValue.password)
        if (error) {
            setValidaionErrors(prev =>
                prev
                    ? { ...prev, password: error }
                    : { password: error, email: '' }
            )
        } else {
            setValidaionErrors(prev =>
                prev ? { ...prev, password: '' } : { password: '', email: '' }
            )
        }
    }, [registerValue.password])

    React.useEffect(() => {
        const error = correctPasswordValidation(
            registerValue.password,
            registerValue.correctPassword
        )
        if (error) {
            setValidaionErrors(prev =>
                prev
                    ? { ...prev, correctPassword: error }
                    : { correctPassword: error, email: '', password: '' }
            )
        } else {
            setValidaionErrors(prev =>
                prev ? { ...prev, password: '' } : { password: '', email: '' }
            )
        }
    }, [registerValue.correctPassword])

    return (
        <div className={s.wrapper}>
            <div className={s.formItem}>
                <label className={s.label}>Email Address</label>
                <Input
                    onChange={e =>
                        setRegisterValue(prev => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    value={registerValue.email}
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
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    onChange={e => onPasswordChange(e)}
                    value={registerValue.password}
                    placeHolder={'Enter the password'}
                    variant={'primary'}
                    type={'password'}
                    helperText={
                        passwordFocus
                            ? passwordValidationMessages.hint
                            : submitForm
                            ? validaionErrors?.password
                            : ''
                    }
                    helperClass={
                        passwordFocus
                            ? !validaionErrors?.password
                                ? 'success'
                                : 'hint'
                            : 'error'
                    }
                    error={
                        submitForm && validaionErrors?.password ? true : false
                    }
                />
            </div>
            <div className={s.formItem}>
                <label className={s.label}>Confirm Password</label>
                <Input
                    onChange={e => onCorrectPasswordChange(e)}
                    value={registerValue.correctPassword}
                    placeHolder={'Enter the password again'}
                    variant={'primary'}
                    type={'password'}
                    helperText={
                        !!registerValue.correctPassword ||
                        (submitForm && validaionErrors?.correctPassword)
                            ? passwordValidationMessages.correct
                            : ''
                    }
                    helperClass={'error'}
                    error={
                        !!registerValue.correctPassword ||
                        (submitForm && validaionErrors?.correctPassword)
                            ? true
                            : false
                    }
                />
            </div>
            <div className={s.formItem}>
                <label className={s.label}>Full name</label>
                <Input
                    onChange={e =>
                        setRegisterValue(prev => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    value={registerValue.name}
                    placeHolder={'Enter first and last name'}
                    variant={'primary'}
                    type={'text'}
                    helperText={validaionErrors?.name}
                    helperClass={'error'}
                    error={!!validaionErrors?.name}
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
