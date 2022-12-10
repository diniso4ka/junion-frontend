import { FC } from 'react'
import s from './ChangePasswordPage.module.scss'
import { ChangePasswordForm } from 'features/RetrievePassword/ui/ChangePasswordForm/ChangePasswordForm'

const ChangePasswordPage: FC = () => {
    return (
        <div className={s.ChangePasswordPage}>
            <ChangePasswordForm />
        </div>
    )
}

export default ChangePasswordPage
