import React from 'react'
import cls from 'classnames'
import s from './EnterEmail.module.scss'
import { Button, Input } from 'components'
import { useNavigate } from 'react-router'
import { ROUTE_SENDLINK } from 'shared/config/consts'
import { mailRegex } from 'shared/helpers/validations/validationRegex'

const EnterEmail = () => {
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = React.useState<string>('')
    const [emailValiadtion, setEmailValiadtion] = React.useState<string>('')

    const onClickGetTheLink = () => {
        if (emailValue) {
            if (!mailRegex(emailValue)) {
                setEmailValiadtion(' Your email address  is incorrect')
            } else {
                setTimeout(() => navigate(ROUTE_SENDLINK), 1000)
            }
        } else {
            setEmailValiadtion('Please, set the email')
        }
    }

    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Retrieve password</h2>
            <p className={cls(s.helper, s.helperHint)}>
                Enter the email address provided during registration
            </p>
            <div className={s.formItem}>
                <Input
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    placeHolder={'Set the email address'}
                    variant={'primary'}
                    type={'text'}
                    helperClass={'error'}
                    helperText={emailValiadtion}
                    error={!!emailValiadtion}
                />
            </div>

            <div className={s.formButton}>
                <Button onClick={onClickGetTheLink} className={s.button}>
                    Get the link
                </Button>
            </div>
        </div>
    )
}

export default EnterEmail
