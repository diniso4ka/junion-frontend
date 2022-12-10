import { FC, useCallback } from 'react'
import s from './ChangePasswordForm.module.scss'
import cls from 'classnames'
import { Button, Input } from 'shared/ui'
import { Text } from 'shared/ui'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/config/components/DynamicModuleLoader'
import {
    retrievePasswordActions,
    retrievePasswordReducer,
} from '../../model/slice/retrievePasswordSlice'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { getRetrievePasswordPassword } from '../../model/selectors/getRetrievePasswordPassword/getRetrievePasswordPassword'
import { getRetrievePasswordConfirmPassword } from '../../model/selectors/getRetrievePasswordConfirmPassword/getRetrievePasswordConfirmPassword'
import { thunkChangePassword } from '../../model/services/thunkChangePassword'
import { getRetrievePasswordStatus } from '../../model/selectors/getRetrievePasswordStatus/getRetrievePasswordStatus'

interface ChangePasswordFormProps {
    className?: string
}
const initialState: ReducersList = {
    retrievePassword: retrievePasswordReducer,
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
    className,
}) => {
    const password = useAppSelector(getRetrievePasswordPassword)
    const confirmPassword = useAppSelector(getRetrievePasswordConfirmPassword)
    const status = useAppSelector(getRetrievePasswordStatus)
    const dispatch = useAppDispatch()

    const onPasswordChange = useCallback(
        e => {
            dispatch(retrievePasswordActions.setPassword(e.target.value))
        },
        [password]
    )
    const onConfirmPasswordChange = useCallback(
        e => {
            dispatch(retrievePasswordActions.setConfirmPassword(e.target.value))
        },
        [confirmPassword]
    )

    const onSubmitForm = () => {
        if (password === confirmPassword && password && confirmPassword) {
            dispatch(thunkChangePassword({ password }))
        }
    }

    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <form className={cls(s.ChangePasswordForm, className)}>
                <div className={s.formItem}>
                    <Text className={s.label} subtitle={'New password'} />
                    <Input
                        disabled={status}
                        className={s.formInput}
                        sizeContainer={'adaptive'}
                        value={password}
                        onChange={onPasswordChange}
                    />
                </div>
                <div className={s.formItem}>
                    <Text
                        className={s.label}
                        subtitle={'Confirm new password'}
                    />
                    <Input
                        disabled={status}
                        onChange={onConfirmPasswordChange}
                        className={s.formInput}
                        sizeContainer={'adaptive'}
                        value={confirmPassword}
                    />
                </div>
                <div className={s.buttonWrapper}>
                    <Button
                        isLoading={status}
                        onClick={onSubmitForm}
                        className={s.button}
                    >
                        Confirm password
                    </Button>
                </div>
            </form>
        </DynamicModuleLoader>
    )
}
