import React from 'react'
import cls from 'classnames'
import s from './Register.module.scss'
import { Button, Input } from '../../../../components'
import {
    IRegisterReqData,
    IValidationResponseData,
} from 'shared/helpers/validations/types'
import {
    correctPasswordValidation,
    passwordValidation,
    registerValidation,
} from 'shared/helpers/validations/registerValidation'
import { useAppDispatch } from 'app/store/types'
import { thunkFetchRegister } from 'app/store/slices/user/userSlice'
import { useNavigate } from 'react-router'
import { passwordValidationMessages } from '../../../../shared/helpers/validations/messages'
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig'

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
            await navigate(routeConfig.LOGIN)
        }
    }

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

    const passwordValidationFunc = () => {
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
    }

    const correctPasswordValidationFunc = () => {
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
                prev
                    ? { ...prev, correctPassword: '' }
                    : { password: '', email: '', correctPassword: '' }
            )
        }
    }

    React.useEffect(() => {
        if (registerData) {
            dispatch(thunkFetchRegister(registerData))
        }
    }, [registerData])

    React.useEffect(() => {
        passwordValidationFunc()
    }, [registerValue.password])

    React.useEffect(() => {
        correctPasswordValidationFunc()
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
                    helperText={validaionErrors?.email}
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
                    type={'password'}
                    helperText={
                        !!validaionErrors?.correctPassword && submitForm
                            ? passwordValidationMessages.correct
                            : ''
                    }
                    error={
                        !!validaionErrors?.correctPassword && submitForm
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
                    helperText={validaionErrors?.name}
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
