import { FC, useCallback, useEffect, useState } from 'react'
import cls from 'classnames'
import s from './LoginForm.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store/types'

import { Button, Input } from 'shared/ui'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginActions } from '../../model/slice/loginSlice'
import { loginValidation } from 'shared/helpers/validations/loginValidation'
import { thunkLoginByMail } from '../../model/services/LoginByMail'
import { thunkCheckAuthMe } from '../../../../entities/User'
import { useNavigate } from 'react-router'
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig'

interface ValidationProps {
    mail?: string
    password?: string
}

const LoginPage: FC = () => {
    const { mail, password, error, isLoading } = useAppSelector(getLoginState)
    const [errors, setErrors] = useState<ValidationProps>({})
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onChangeMail = useCallback(
        value => {
            dispatch(loginActions.setMail(value.target.value))
        },
        [dispatch, mail]
    )
    const onChangePassword = useCallback(
        value => {
            dispatch(loginActions.setPassword(value.target.value))
        },
        [dispatch, password]
    )

    const onSubmitForm = useCallback(async () => {
        const validationErrors = loginValidation({ mail, password })
        setErrors(validationErrors)
        if (!validationErrors) {
            await dispatch(thunkLoginByMail({ email: mail, password }))
            await dispatch(thunkCheckAuthMe(0))
            navigate(routeConfig.HOME)
        }
    }, [dispatch, mail, password, errors])

    return (
        <main className={s.wrapper}>
            <form className={s.contentWrapper}>
                <div className={s.message}>
                    {error && (
                        <p className={cls(s.helper, s.helperError)}>{error}</p>
                    )}
                </div>
                <div className={s.formItem}>
                    <Input
                        placeHolder={'E-mail address'}
                        onChange={onChangeMail}
                        value={mail}
                        helperText={errors?.mail}
                        helperClass={'error'}
                        error={!!errors?.mail}
                    />
                </div>
                <div className={s.formItem}>
                    <Input
                        placeHolder={'Password'}
                        type={'password'}
                        onChange={onChangePassword}
                        value={password}
                        helperText={errors?.password}
                        helperClass={'error'}
                        error={!!errors?.password}
                        forgotPass={true}
                    />
                </div>
                <div className={s.formButton}>
                    <Button
                        onClick={onSubmitForm}
                        isLoading={isLoading}
                        className={s.button}
                    >
                        Log In
                    </Button>
                </div>
            </form>
        </main>
    )
}

export default LoginPage
