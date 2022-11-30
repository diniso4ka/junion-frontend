import React, { FC, useCallback, useEffect, useState } from 'react'
import s from './RegisterForm.module.scss'
import cls from 'classnames'
import { Button, Input } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'app/store/types'
import { getRegisterState } from '../../model/selectors/getRegisterState/getRegisterState'
import { registerActions } from '../../model/slice/registerSlice'
import { registerValidation } from 'shared/helpers/validations/registerValidation'
import { IValidationResponseData } from 'shared/types/auth'
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
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig'

interface RegisterFormProps {
    className?: string
}

export const RegisterForm: FC<RegisterFormProps> = ({ className }) => {
    const [errors, setErrors] = useState<IValidationResponseData>({})
    const [formSubmit, setFormSubmit] = useState<boolean>(false)
    const [mailFocus, setMailFocus] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus] =
        useState<boolean>(false)
    const [nameFocus, setNameFocus] = useState<boolean>(false)
    const [superCodeFocus, setSuperCodeFocus] = useState<boolean>(false)
    const {
        mail,
        password,
        confirmPassword,
        name,
        superCode,
        asyncErrors,
        isLoading,
    } = useAppSelector(getRegisterState)
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
        setMailFocus(false)
    }, [mailFocus])
    const onPasswordBlur = useCallback(() => {
        setPasswordFocus(false)
    }, [passwordFocus])
    const onConfirmPasswordBlur = useCallback(() => {
        setConfirmPasswordFocus(false)
    }, [confirmPasswordFocus])
    const onNameBlur = useCallback(() => {
        setNameFocus(false)
    }, [nameFocus])
    const onSuperCodeBlur = useCallback(() => {
        setSuperCodeFocus(false)
    }, [superCodeFocus])

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
        <div className={s.wrapper}>
            <form className={s.contentWrapper}>
                <div className={s.formItem}>
                    <label className={s.label}>Email Address</label>
                    <Input
                        onChange={onChangeMail}
                        value={mail}
                        onBlur={onMailBlur}
                        placeHolder={'Set the email address as the login name'}
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
                        error={formSubmit && errors?.password ? true : false}
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
    )
}
