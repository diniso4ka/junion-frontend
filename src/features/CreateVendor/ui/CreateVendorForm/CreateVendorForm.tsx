import { FC, useCallback, useState } from 'react'
import s from './CreateVendorForm.module.scss'
import cls from 'classnames'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/config/components/DynamicModuleLoader'
import closeIcon from 'shared/assets/images/icons/close.svg'
import {
    createVendorActions,
    createVendorReducer,
} from '../../model/slice/createVendorSlice'
import { Button, Input, Text } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'app/store'
import { getCreateVendorName } from '../../model/selectors/getCreateVendorName/getCreateVendorName'
import { getCreateVendorRegCode } from '../../model/selectors/getCreateVendorRegCode/getCreateVendorRegCode'
import { getCreateVendorAddress } from '../../model/selectors/getCreateVendorAddress/getCreateVendorAddress'
import { getCreateVendorStatus } from '../../model/selectors/getCreateVendorStatus/getCreateVendorStatus'
import { getCreateVendorError } from '../../model/selectors/getCreateVendorError/getCreateVendorError'
import { thunkCreateVendor } from '../../model/services/thunkCreateVendor'
import { thunkGetVendorsList } from 'entities/Vendors'

interface CreateVendorFormProps {
    className?: string
    onClose: () => void
}

const initialState: ReducersList = {
    createVendor: createVendorReducer,
}

export const CreateVendorForm: FC<CreateVendorFormProps> = ({
    className,
    onClose,
}) => {
    const name = useAppSelector(getCreateVendorName)
    const regCode = useAppSelector(getCreateVendorRegCode)
    const address = useAppSelector(getCreateVendorAddress)
    const status = useAppSelector(getCreateVendorStatus)
    const error = useAppSelector(getCreateVendorError)
    const [validationError, setValidationError] = useState(false)
    const dispatch = useAppDispatch()

    const onSubmitForm = useCallback(async () => {
        setValidationError(false)
        if (!name && !address && !regCode) {
            return setValidationError(true)
        }
        const response = await dispatch(
            thunkCreateVendor({ name, address, regCode })
        )
        // @ts-ignore
        if (response.payload.status === 201) {
            dispatch(thunkGetVendorsList())
            onClose()
        }
    }, [name, regCode, address])

    const onChangeName = useCallback(
        e => {
            dispatch(createVendorActions.setName(e.target.value))
        },
        [name, dispatch]
    )
    const onChangeAddress = useCallback(
        e => {
            dispatch(createVendorActions.setAddress(e.target.value))
        },
        [address, dispatch]
    )
    const onChangeRegCode = useCallback(
        e => {
            dispatch(createVendorActions.setRegCode(e.target.value))
        },
        [regCode, dispatch]
    )
    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <div className={cls(s.CreateVendorForm, className)}>
                <img
                    onClick={onClose}
                    className={s.closeIcon}
                    src={closeIcon}
                />
                <Text className={s.title} title={'New vendor'} />
                <form className={s.form}>
                    <ul className={s.items}>
                        <li className={s.inputItem}>
                            <label className={s.label}>Vendor name</label>
                            <Input
                                sizeContainer={'adaptive'}
                                className={s.input}
                                onChange={onChangeName}
                                value={name}
                                disabled={status}
                            />
                        </li>
                        <li className={s.inputItem}>
                            <label className={s.label}>Reg Code</label>
                            <Input
                                sizeContainer={'adaptive'}
                                className={s.input}
                                onChange={onChangeRegCode}
                                value={regCode}
                                disabled={status}
                            />
                        </li>
                        <li className={s.inputItem}>
                            <label className={s.label}>address</label>
                            <Input
                                sizeContainer={'adaptive'}
                                className={s.input}
                                onChange={onChangeAddress}
                                value={address}
                                disabled={status}
                            />
                        </li>
                    </ul>
                </form>
                <div className={s.buttonWrapper}>
                    <Button
                        isLoading={status}
                        className={s.button}
                        size={'small'}
                        onClick={onSubmitForm}
                    >
                        Create
                    </Button>
                </div>
                {error && <p>Server Error</p>}
                {validationError && <p>Validation Error</p>}
            </div>
        </DynamicModuleLoader>
    )
}
