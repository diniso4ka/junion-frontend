import React from 'react'
import cls from 'classnames'
import s from './Login.module.css'

const Login = () => {
    return (
        <main className={s.wrapper}>
            <div className={s.login_block}>
                <div className={s.title} />
                <input type='text' className={s.login} />
                <input type='text' className={s.password} />
            </div>
        </main>
    )
}

export default Login
