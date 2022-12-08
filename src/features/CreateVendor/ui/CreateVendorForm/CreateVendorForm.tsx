import { FC } from 'react'
import s from './CreateVendorForm.module.scss'
import cls from 'classnames'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/config/components/DynamicModuleLoader'
import closeIcon from 'shared/assets/images/icons/close.svg'
import { createVendorReducer } from '../../model/slice/createVendorSlice'
import { Button, Input } from 'shared/ui'

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
    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <div className={cls(s.CreateProductForm, className)}>
                <img
                    onClick={onClose}
                    className={s.closeIcon}
                    src={closeIcon}
                />
                <h1 className={s.title}>New product</h1>
                <form className={s.form}>
                    <ul className={s.items}>
                        <li className={s.inputItem}>
                            <label className={s.label}>Vendor name</label>
                            <Input
                                sizeContainer={'adaptive'}
                                className={s.input}
                            />
                        </li>
                        <li className={s.inputItem}>
                            <label className={s.label}>Reg Code</label>
                            <Input
                                sizeContainer={'adaptive'}
                                className={s.input}
                            />
                        </li>
                        <li className={s.inputItem}>
                            <label className={s.label}>address</label>
                            <Input
                                sizeContainer={'adaptive'}
                                className={s.input}
                            />
                        </li>
                    </ul>
                </form>
                <div className={s.buttonWrapper}>
                    <Button className={s.button} size={'small'}>
                        Create
                    </Button>
                </div>
                {/*{error && <p> Server Error</p>}*/}
            </div>
        </DynamicModuleLoader>
    )
}
