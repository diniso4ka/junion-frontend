import React from 'react'
import cls from 'classnames'
import s from './Register.module.scss'
import { Button, Input } from 'components'
import { IRegisterReqData, IValidationResponseData } from 'shared/types/auth'
import {
    correctPasswordValidation,
    passwordValidation,
} from 'shared/helpers/validations/helpers'
import { registerValidation } from 'shared/helpers/validations/registerValidation'
import { Status, useAppDispatch, useAppSelector } from 'app/store/types'
import {
    thunkFetchAuthMe,
    thunkFetchRegister,
} from 'app/store/slices/user/thunk'
import {
    passwordValidationMessages,
    superCodeValidationMessages,
} from 'shared/helpers/validations/messages'

const Register = () => {
    const asyncErrors = useAppSelector(state => state.user.errors)
    const [validaionErrors, setValidaionErrors] =
        React.useState<IValidationResponseData>({})

    const [passwordFocus, setPasswordFocus] = React.useState<boolean>(false)
    const [superCodeFocus, setSuperCodeFocus] = React.useState<boolean>(false)
    const [inputFocus, setInputFocus] = React.useState<boolean>(false)

    const [submitForm, setSubmitForm] = React.useState<boolean>(false)
    const [registerData, setRegisterData] =
        React.useState<IRegisterReqData | null>()
    const [registerValue, setRegisterValue] = React.useState<IRegisterReqData>({
        email: '',
        password: '',
        correctPassword: '',
        name: '',
        superCode: '',
    })

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.user.user.status)
    // При сабмите формы

    const onSubmitForm = async () => {
        setSubmitForm(true)
        const errors = registerValidation(registerValue)
        console.log(errors)
        if (errors) {
            setValidaionErrors({ ...errors })
        } else {
            setValidaionErrors(null)
            await setRegisterData({
                email: registerValue.email,
                password: registerValue.password,
                name: registerValue.name,
                superCode: registerValue.superCode,
            })
        }
    }
    const onRegister = async registerData => {
        const res = await dispatch(thunkFetchRegister(registerData))
        if (res.payload) {
            dispatch(thunkFetchAuthMe())
        }
    }

    // Ивенты onChange

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

    //Валидация паролей

    const passwordValidationFunc = () => {
        const error = passwordValidation(registerValue.password)
        if (error) {
            setValidaionErrors(prev => ({ ...prev, password: error }))
        } else {
            setValidaionErrors(prev => ({ ...prev, password: '' }))
        }
    }

    const correctPasswordValidationFunc = () => {
        const error = correctPasswordValidation(
            registerValue.password,
            registerValue.correctPassword
        )
        if (error) {
            setValidaionErrors(prev => ({ ...prev, correctPassword: error }))
        } else {
            setValidaionErrors(prev => ({ ...prev, correctPassword: '' }))
        }
    }

    // Ивенты на unfocus

    const onBlurPassword = () => {
        registerValue.password = registerValue.password.trimStart().trimEnd()
        setPasswordFocus(false)
    }
    const onBlur = () => {
        registerValue.email = registerValue.email.trimStart().trimEnd()
        registerValue.correctPassword = registerValue.correctPassword
            .trimStart()
            .trimEnd()
        registerValue.name = registerValue.name.trimStart().trimEnd()
        setInputFocus(!inputFocus)
    }

    const onBlurSuperCode = () => {
        registerValue.superCode = registerValue.superCode.trimStart().trimEnd()
        setSuperCodeFocus(false)
    }

    //Запрос при успешной валидации

    React.useEffect(() => {
        if (registerData) {
            onRegister(registerData)
        }
    }, [registerData])

    //Валидация паролей в реальном времени

    React.useEffect(() => {
        passwordValidationFunc()
    }, [registerValue.password])

    React.useEffect(() => {
        correctPasswordValidationFunc()
    }, [registerValue.correctPassword])

    return (
        <div className={s.wrapper}>
            <div className={s.contentWrapper}>
                <div className={s.formItem}>
                    <label className={s.label}>Email Address</label>
                    <Input
                        onBlur={onBlur}
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
                        onBlur={onBlurPassword}
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
                            submitForm && validaionErrors?.password
                                ? true
                                : false
                        }
                    />
                </div>
                <div className={s.formItem}>
                    <label className={s.label}>Confirm Password</label>
                    <Input
                        onChange={e => onCorrectPasswordChange(e)}
                        onBlur={onBlur}
                        value={registerValue.correctPassword}
                        placeHolder={'Enter the password again'}
                        type={'password'}
                        helperText={
                            !!validaionErrors?.correctPassword && submitForm
                                ? passwordValidationMessages.correct
                                : ''
                        }
                        error={!!validaionErrors?.correctPassword && submitForm}
                    />
                </div>
                <div className={s.formItem}>
                    <label className={s.label}>Full name</label>
                    <Input
                        onBlur={onBlur}
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
                    <div className={s.formItem}>
                        <label className={s.label}>Super Code</label>
                        <Input
                            onFocus={() => setSuperCodeFocus(true)}
                            onBlur={() => onBlurSuperCode}
                            onChange={e =>
                                setRegisterValue(prev => ({
                                    ...prev,
                                    superCode: e.target.value,
                                }))
                            }
                            value={registerValue.superCode}
                            placeHolder={'Enter the Super Code'}
                            error={
                                !!validaionErrors?.superCode && submitForm
                                    ? true
                                    : false
                            }
                            helperClass={
                                superCodeFocus
                                    ? !validaionErrors?.superCode
                                        ? 'success'
                                        : 'hint'
                                    : 'error'
                            }
                            sizeContainer={'secondary'}
                        />
                    </div>
                    <Button
                        isLoading={status === Status.LOADING && true}
                        onClick={onSubmitForm}
                        className={s.button}
                    >
                        Sign Up
                    </Button>
                </div>
                <p
                    className={cls(
                        s.helper,
                        superCodeFocus
                            ? s.hint
                            : (!!validaionErrors?.superCode && s.error) ||
                                  (asyncErrors.wrongSuperCode && s.error)
                    )}
                >
                    {superCodeFocus
                        ? superCodeValidationMessages.hint
                        : !!validaionErrors?.superCode && submitForm
                        ? superCodeValidationMessages.incorrect
                        : asyncErrors.wrongSuperCode
                        ? superCodeValidationMessages.incorrect
                        : ''}
                </p>
            </div>
        </div>
    )
}

export default Register
