import React, { FC, useCallback, useEffect, useState } from 'react'
import s from './RegisterForm.module.scss'
import cls from 'classnames'
import { Button, Input } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'
import {
    registerActions,
    registerReducer,
} from '../../model/slice/registerSlice'
import { registerValidation } from 'shared/helpers/validations/registerValidation'
import {
    passwordValidationMessages,
    superCodeValidationMessages,
} from 'shared/helpers/validations/messages'
import {
    correctPasswordValidation,
    passwordValidation,
} from 'shared/helpers/validations/helpers'
import { thunkRegisterByMail } from '../../model/services/RegisterByMail'
import { useNavigate } from 'react-router'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/config/components/DynamicModuleLoader'
import { getRegisterMail } from '../../model/selectors/getRegisterMail/getRegisterMail'
import { getRegisterPassword } from '../../model/selectors/getRegisterPassword/getRegisterPassword'
import { getRegisterConfirmPassword } from '../../model/selectors/getRegisterConfirmPassword/getRegisterConfirmPassword'
import { getRegisterName } from '../../model/selectors/getRegisterName/getRegisterName'
import { getRegisterSuperCode } from '../../model/selectors/getRegisterSuperCode/getRegisterSuperCode'
import { getRegisterAsyncErrors } from '../../model/selectors/getRegisterAsyncErrors/getRegisterAsyncErrors'
import { getRegisterStatus } from '../../model/selectors/getRegisterStatus/getRegisterStatus'
import { RegisterForm as RegisterFormType } from '../../model/types/RegisterSchema'

interface RegisterFormProps {
    className?: string
}

const initialState: ReducersList = {
    registerForm: registerReducer,
}

export const RegisterForm: FC<RegisterFormProps> = ({ className }) => {
    const [errors, setErrors] = useState<RegisterFormType>({})
    const [formSubmit, setFormSubmit] = useState<boolean>(false)
    const [mailFocus, setMailFocus] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus] =
        useState<boolean>(false)
    const [nameFocus, setNameFocus] = useState<boolean>(false)
    const [superCodeFocus, setSuperCodeFocus] = useState<boolean>(false)
    const mail = useAppSelector(getRegisterMail)
    const password = useAppSelector(getRegisterPassword)
    const confirmPassword = useAppSelector(getRegisterConfirmPassword)
    const name = useAppSelector(getRegisterName)
    const superCode = useAppSelector(getRegisterSuperCode)
    const asyncErrors = useAppSelector(getRegisterAsyncErrors)
    const isLoading = useAppSelector(getRegisterStatus)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // onChange
    const onChangeMail = useCallback(
        value => {
            dispatch(registerActions.setMail(value.target.value))
        },
        [dispatch, mail]
    )
    const onChangePassword = useCallback(
        value => {
            dispatch(registerActions.setPassword(value.target.value))
        },
        [dispatch, password]
    )
    const onChangeConfirmPassword = useCallback(
        value => {
            dispatch(registerActions.setConfirmPassword(value.target.value))
        },
        [dispatch, confirmPassword]
    )
    const onChangeUsername = useCallback(
        value => {
            dispatch(registerActions.setName(value.target.value))
        },
        [dispatch, name]
    )
    const onChangeSupercode = useCallback(
        value => {
            dispatch(registerActions.setSuperCode(value.target.value))
        },
        [dispatch, superCode]
    )

    //onFocus
    const onMailFocus = useCallback(() => {
        setMailFocus(true)
    }, [mailFocus])
    const onPasswordFocus = useCallback(() => {
        setPasswordFocus(true)
    }, [passwordFocus])
    const onConfirmPasswordFocus = useCallback(() => {
        setConfirmPasswordFocus(true)
    }, [confirmPasswordFocus])
    const onNameFocus = useCallback(() => {
        setNameFocus(true)
    }, [nameFocus])
    const onSuperCodeFocus = useCallback(() => {
        setSuperCodeFocus(true)
    }, [superCodeFocus])

    //onBlur
    const onMailBlur = useCallback(() => {
        dispatch(registerActions.setMail(mail.trimEnd().trimStart()))
        setMailFocus(false)
    }, [mailFocus, mail])
    const onPasswordBlur = useCallback(() => {
        dispatch(registerActions.setPassword(password.trimEnd().trimStart()))
        setPasswordFocus(false)
    }, [passwordFocus, password])
    const onConfirmPasswordBlur = useCallback(() => {
        dispatch(
            registerActions.setConfirmPassword(
                confirmPassword.trimEnd().trimStart()
            )
        )
        setConfirmPasswordFocus(false)
    }, [confirmPasswordFocus, confirmPassword])
    const onNameBlur = useCallback(() => {
        dispatch(
            registerActions.setName(
                name.replace(/\s+/g, ' ').trimEnd().trimStart()
            )
        )
        setNameFocus(false)
    }, [nameFocus, name])
    const onSuperCodeBlur = useCallback(() => {
        dispatch(registerActions.setSuperCode(superCode.trimEnd().trimStart()))
        setSuperCodeFocus(false)
    }, [superCodeFocus, superCode])

    const onSubmitForm = useCallback(async () => {
        setFormSubmit(true)
        const validationErrors = registerValidation({
            mail,
            password,
            confirmPassword,
            name,
            superCode,
        })
        setErrors(validationErrors)
        if (!validationErrors) {
            const response = await dispatch(
                thunkRegisterByMail({ email: mail, password, name, superCode })
            )
            // @ts-ignore
            if (response.payload.status === 201) {
                await navigate(routeConfig.HOME)
            }
        }
    }, [mail, password, confirmPassword, name, superCode])

    const passwordValidationFunc = () => {
        const error = passwordValidation(password)
        if (error) {
            setErrors(prev => ({ ...prev, password: error }))
        } else {
            setErrors(prev => ({ ...prev, password: '' }))
        }
    }

    const correctPasswordValidationFunc = () => {
        const error = correctPasswordValidation(password, confirmPassword)
        if (error) {
            setErrors(prev => ({ ...prev, confirmPassword: error }))
        } else {
            setErrors(prev => ({ ...prev, confirmPassword: '' }))
        }
    }

    useEffect(() => {
        passwordValidationFunc()
    }, [password])

    useEffect(() => {
        correctPasswordValidationFunc()
    }, [confirmPassword])

    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <div className={s.wrapper}>
                <form className={s.contentWrapper}>
                    <div className={s.formItem}>
                        <label className={s.label}>Email Address</label>
                        <Input
                            onChange={onChangeMail}
                            value={mail}
                            onBlur={onMailBlur}
                            placeHolder={
                                'Set the email address as the login name'
                            }
                            helperText={errors?.mail || asyncErrors?.mail}
                            error={!!errors?.mail || !!asyncErrors?.mail}
                        />
                    </div>
                    <div className={s.formItem}>
                        <label className={s.label}>Password</label>
                        <Input
                            onChange={onChangePassword}
                            value={password}
                            onFocus={onPasswordFocus}
                            onBlur={onPasswordBlur}
                            placeHolder={'Enter the password'}
                            type={'password'}
                            helperText={
                                passwordFocus
                                    ? passwordValidationMessages.hint
                                    : formSubmit
                                    ? errors?.password
                                    : ''
                            }
                            helperClass={
                                passwordFocus
                                    ? !errors?.password
                                        ? 'success'
                                        : 'hint'
                                    : 'error'
                            }
                            error={
                                formSubmit && errors?.password ? true : false
                            }
                        />
                    </div>
                    <div className={s.formItem}>
                        <label className={s.label}>Confirm Password</label>
                        <Input
                            onChange={onChangeConfirmPassword}
                            value={confirmPassword}
                            onBlur={onConfirmPasswordBlur}
                            placeHolder={'Enter the password again'}
                            type={'password'}
                            helperText={
                                !!errors?.confirmPassword && formSubmit
                                    ? passwordValidationMessages.correct
                                    : ''
                            }
                            error={!!errors?.confirmPassword && formSubmit}
                        />
                    </div>
                    <div className={s.formItem}>
                        <label className={s.label}>Full name</label>
                        <Input
                            onChange={onChangeUsername}
                            value={name}
                            onBlur={onNameBlur}
                            placeHolder={'Enter first and last name'}
                            helperText={errors?.name}
                            error={!!errors?.name}
                        />
                    </div>
                    <div className={s.formButton}>
                        <div className={s.formItem}>
                            <label className={s.label}>Super Code</label>
                            <Input
                                onChange={onChangeSupercode}
                                value={superCode}
                                onFocus={onSuperCodeFocus}
                                onBlur={onSuperCodeBlur}
                                placeHolder={'Enter the Super Code'}
                                error={
                                    !!errors?.superCode ||
                                    (!!asyncErrors?.superCode && formSubmit)
                                        ? true
                                        : false
                                }
                                helperClass={
                                    superCodeFocus
                                        ? !errors?.superCode
                                            ? 'success'
                                            : 'hint'
                                        : 'error'
                                }
                                sizeContainer={'small'}
                            />
                        </div>
                        <Button
                            isLoading={isLoading}
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
                                : (!!errors?.superCode && s.error) ||
                                      (asyncErrors?.superCode && s.error)
                        )}
                    >
                        {superCodeFocus
                            ? superCodeValidationMessages.hint
                            : !!errors?.superCode && formSubmit
                            ? superCodeValidationMessages.incorrect
                            : asyncErrors?.superCode
                            ? superCodeValidationMessages.incorrect
                            : ''}
                    </p>
                </form>
            </div>
        </DynamicModuleLoader>
    )
}
