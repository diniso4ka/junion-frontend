import React from 'react'
import cls from 'classnames'
import s from './Login.module.scss'
import { Button, Input, Link } from 'components'

const Login = () => {
    return (
        <main className={s.wrapper}>
            <div className={s.formItem}>
                <Input
                    placeHolder={'E-mail address'}
                    variant={'primary'}
                    type={'text'}
                    helperText={
                        '6 to 20 characters. Only letters, numbers or sumbols'
                    }
                    helperClass={'error'}
                    error={false}
                />
            </div>
            <div className={s.formItem}>
                <Input
                    placeHolder={'Password'}
                    variant={'primary'}
                    type={'password'}
                    helperText={'Please, enter the Password'}
                    helperClass={'success'}
                    error={false}
                />
            </div>
            <div className={s.formButton}>
                <Button className={s.button}>Log In</Button>
            </div>
        </main>
    )
}

export default Login
