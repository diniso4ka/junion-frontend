import React from 'react'
import cls from 'classnames'
import s from './SendLink.module.scss'
import { Button, Input } from '../../../components'
import { useNavigate } from 'react-router'

const SendLink = () => {
    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Retrieve password</h2>
            <p className={cls(s.helper, s.helperHint)}>
                The link has been sent to your email. Please, follow this link
            </p>
        </div>
    )
}

export default SendLink
