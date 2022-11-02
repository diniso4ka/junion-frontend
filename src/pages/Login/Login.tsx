import React from 'react'
import cls from 'classnames'
import s from './Login.module.scss'
import { Button, Input } from 'components'
import { ILoginData } from './types'

const Login = () => {
    const [emailValue, setEmailValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const [loginData, setLoginData] = React.useState<ILoginData>({
        email: 'email',
        password: 'password',
    })

    const onSubmitForm = () => {
        setLoginData({
            email: emailValue,
            password: passwordValue,
        })
    }

    React.useEffect(() => {
        console.log(loginData)
    }, [loginData])
    return (
        <main className={s.wrapper}>
            <div className={s.formItem}>
                <Input
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    placeHolder={'E-mail address'}
                    variant={'primary'}
                    type={'text'}
                    helperText={
                        loginData?.email
                            ? ''
                            : 'Please, enter the email address'
                    }
                    helperClass={'error'}
                    error={loginData?.email ? false : true}
                />
            </div>
            <div className={s.formItem}>
                <Input
                    onChange={e => setPasswordValue(e.target.value)}
                    value={passwordValue}
                    placeHolder={'Password'}
                    variant={'primary'}
                    type={'password'}
                    helperText={
                        loginData?.password ? '' : 'Please, enter the password'
                    }
                    helperClass={'error'}
                    error={loginData?.password ? false : true}
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
