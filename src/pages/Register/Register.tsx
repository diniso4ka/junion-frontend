import React from 'react'
import cls from 'classnames'
import s from './Register.module.scss'
import { Button, Input } from '../../components'
import {
    ILoginReqData,
    IRegisterReqData,
    IValidationResponseData,
} from 'shared/helpers/validations/types'
import { registerValidation } from 'shared/helpers/validations/registerValidation'
import { useAppDispatch } from 'store/types'
import { thunkFetchRegister } from 'store/slices/user/userSlice'
import { useNavigate } from 'react-router'
import * as routes from 'shared/config/consts'
import { passwordRegex } from '../../shared/helpers/validations/validationRegex'
import { passwordValidationMessages } from '../../shared/config/messages'

const Register = () => {
    const [validaionErrors, setValidaionErrors] =
        React.useState<IValidationResponseData | null>()
    const [passwordFocus, setPasswordFocus] = React.useState(false)
    const [passwordValidation, setPasswordValidation] =
        React.useState<boolean>(false)
    const [correctPasswordValidation, setCorrectPasswordValidation] =
        React.useState<boolean>(true)
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
        const errors = registerValidation(registerValue)
        if (errors) {
            console.log(errors)
            setValidaionErrors({ ...errors })
        } else {
            setValidaionErrors(null)
            await setRegisterData(registerValue)
            await navigate(routes.ROUTE_LOGIN)
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

    React.useEffect(() => {
        if (registerData) {
            dispatch(thunkFetchRegister(registerData))
        }
    }, [registerData])

    React.useEffect(() => {
        setPasswordValidation(!!passwordRegex(registerValue.password))
    }, [registerValue.password])

    React.useEffect(() => {
        setCorrectPasswordValidation(
            registerValue.password === registerValue.correctPassword
        )
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
                            : !!registerValue.password
                            ? !!passwordValidation
                                ? ''
                                : validaionErrors?.password
                            : !!passwordValidation
                            ? validaionErrors?.password
                            : ''
                    }
                    helperClass={
                        passwordValidation
                            ? 'success'
                            : passwordFocus
                            ? 'hint'
                            : 'error'
                    }
                    error={
                        !!registerValue.password
                            ? !passwordValidation
                            : !!validaionErrors?.password
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
                        !!registerValue.correctPassword
                            ? !correctPasswordValidation
                                ? passwordValidationMessages.correct
                                : ''
                            : ''
                    }
                    helperClass={'error'}
                    error={
                        !!registerValue.correctPassword
                            ? !correctPasswordValidation
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
