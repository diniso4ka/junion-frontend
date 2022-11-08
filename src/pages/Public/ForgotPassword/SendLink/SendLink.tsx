import React from 'react'
import cls from 'classnames'
import s from './SendLink.module.scss'

const SendLink = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.contentWrapper}>
                <h2 className={s.title}>Retrieve password</h2>
                <p className={cls(s.helper, s.helperHint)}>
                    The link has been sent to your email. Please, follow this
                    link
                </p>
            </div>
        </div>
    )
}

export default SendLink
