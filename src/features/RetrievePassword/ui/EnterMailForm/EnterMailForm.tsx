import React, { FC, useEffect } from 'react'
import s from './EnterMailForm.module.scss'
import cls from 'classnames'
import { useNavigate } from 'react-router'
import { mailRegex } from '../../../../shared/helpers/validations/validationRegex'
import { routeConfig } from '../../../../shared/config/routeConfig/routeConfig'
import { Button, Input } from '../../../../shared/ui'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { getRetrievePasswordMail } from '../../model/selectors/getRetrievePasswordMail/getRetrievePasswordMail'
import {
    retrievePasswordActions,
    retrievePasswordReducer,
} from '../../model/slice/retrievePasswordSlice'
import {
    DynamicModuleLoader,
    ReducersList,
} from '../../../../shared/config/components/DynamicModuleLoader'
import { thunkEnterMail } from '../../model/services/thunkEnterMail'
import { getRetrievePasswordError } from '../../model/selectors/getRetrievePasswordError/getRetrievePasswordError'
import { getRetrievePasswordStatus } from '../../model/selectors/getRetrievePasswordStatus/getRetrievePasswordStatus'

interface EnterEmailFormProps {
    className?: string
}

const initialState: ReducersList = {
    retrievePassword: retrievePasswordReducer,
}

export const EnterMailForm: FC<EnterEmailFormProps> = ({ className }) => {
    const navigate = useNavigate()
    const mail = useAppSelector(getRetrievePasswordMail)
    const error = useAppSelector(getRetrievePasswordError)
    const status = useAppSelector(getRetrievePasswordStatus)
    const dispatch = useAppDispatch()
    const [emailValidation, setEmailValidation] = React.useState<string>('')

    const onMailChange = e => {
        dispatch(retrievePasswordActions.setMail(e.target.value))
    }

    const onClickGetTheLink = async () => {
        if (mail) {
            if (!mailRegex(mail)) {
                setEmailValidation(' Your email address  is incorrect')
            } else {
                const response = await dispatch(thunkEnterMail(mail))
                // @ts-ignore
                if (!!response?.payload?.data) {
                    navigate(routeConfig.SENDLINK)
                }
            }
        } else {
            setEmailValidation('Please, set the email')
        }
    }

    useEffect(() => {
        if (error) {
            setEmailValidation('User not found')
        }
    }, [error])

    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <div className={s.wrapper}>
                <div className={s.contentWrapper}>
                    <h2 className={s.title}>Retrieve password</h2>
                    <p className={cls(s.helper, s.helperHint)}>
                        Enter the email address provided during registration
                    </p>
                    <div className={s.formItem}>
                        <Input
                            disabled={status}
                            onChange={onMailChange}
                            value={mail}
                            placeHolder={'Set the email address'}
                            variant={'primary'}
                            type={'text'}
                            helperClass={'error'}
                            helperText={emailValidation}
                            error={!!emailValidation}
                        />
                    </div>

                    <div className={s.formButton}>
                        <Button
                            isLoading={status}
                            onClick={onClickGetTheLink}
                            className={s.button}
                        >
                            Get the link
                        </Button>
                    </div>
                </div>
            </div>
        </DynamicModuleLoader>
    )
}