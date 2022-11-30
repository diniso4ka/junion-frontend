import React from 'react'
import s from './RegisterPage.module.scss'
import { RegisterForm } from 'features/RegisterByMail'

const RegisterPage = () => {
    return (
        <div className={s.wrapper}>
            <RegisterForm />
        </div>
    )
}

export default RegisterPage
