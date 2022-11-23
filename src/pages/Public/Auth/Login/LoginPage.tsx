import { FC, useEffect, useState } from 'react'
import cls from 'classnames'
import s from './LoginPage.module.scss'

import { loginValidation } from 'shared/helpers/validations/loginValidation'
import { IValidationResponseData, ILoginReqData } from 'shared/types/auth'

import { Status, useAppDispatch, useAppSelector } from 'app/store/types'
import { thunkFetchAuthMe, thunkFetchLogin } from 'app/store/slices/user/thunk'

import { Button, Input } from 'components'
import { useNavigate } from 'react-router'
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig'

const LoginPage: FC = () => {
    const [validaionErrors, setValidaionErrors] =
        useState<IValidationResponseData>()
    const [loginData, setLoginData] = useState<ILoginReqData>()
    const [loginValue, setLoginValue] = useState<ILoginReqData>({
        email: '',
        password: '',
    })

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { status } = useAppSelector(state => state.user.user)
    const { incorrect } = useAppSelector(state => state.user.errors)

    const onSubmitForm = () => {
        const errors = loginValidation({
            ...loginValue,
        })
        if (errors) {
            setValidaionErrors({
                ...errors,
            })
        } else {
            setValidaionErrors(null)
            setLoginData({
                ...loginValue,
            })
        }
    }
    const onLogIn = async () => {
        if (loginData) {
            await dispatch(thunkFetchLogin(loginData))
            const authResp = await dispatch(thunkFetchAuthMe())
            // @ts-ignore
            if (authResp.payload.status === 200) {
                navigate(routeConfig.HOME)
            }
        }
    }

    useEffect(() => {
        onLogIn()
    }, [loginData])

    return (
        <main className={s.wrapper}>
            <form className={s.contentWrapper}>
                <div className={s.message}>
                    <p className={cls(s.helper, s.helperError)}>{incorrect}</p>
                </div>
                <div className={s.formItem}>
                    <Input
                        onChange={e =>
                            setLoginValue(prev => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        value={loginValue.email}
                        placeHolder={'E-mail address'}
                        helperText={validaionErrors?.email}
                        helperClass={'error'}
                        error={!!validaionErrors?.email}
                    />
                </div>
                <div className={s.formItem}>
                    <Input
                        onChange={e =>
                            setLoginValue(prev => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        value={loginValue.password}
                        placeHolder={'Password'}
                        type={'password'}
                        helperText={validaionErrors?.password}
                        helperClass={'error'}
                        error={!!validaionErrors?.password}
                        forgotPass={true}
                    />
                </div>
                <div className={s.formButton}>
                    <Button
                        isLoading={status === Status.LOADING}
                        onClick={onSubmitForm}
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
