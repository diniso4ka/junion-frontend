import { FC, useEffect, useState } from 'react'
import s from './CreateProductForm.module.scss'
import cls from 'classnames'
import { Button, Input } from 'shared/ui'
import { CreateProductDefault } from 'shared/helpers/degaultValues/createProduct'
import { ICreateProduct } from 'shared/types/createProduct'
import { useAppDispatch } from 'app/store/types'
import { thunkFetchCreateProduct } from 'app/store/slices/products/thunk'

interface CreateProductFormProps {
    className?: string
}

export const CreateProductForm: FC<CreateProductFormProps> = ({
    className,
}) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<ICreateProduct>(CreateProductDefault)
    const [data, setData] = useState({})
    const onChangeInput = (value, input) => {
        setValue(prev => ({
            ...prev,
            [input]: value.target.value,
        }))
    }
    const onSubmitForm = () => {
        //     if (value.name.length > 0) {
        //         setData(value)
        //     }
    }
    useEffect(() => {
        // if (Object.values(data).length > 0) {
        //     dispatch(thunkFetchCreateProduct(value))
        // }
    }, [data])
    return (
        <div className={cls(s.CreateProductForm, className)}>
            <h1>New product</h1>
            <form className={s.form}>
                <ul className={s.labels}>
                    <li className={s.labelItem}>Product name</li>
                    <li className={s.labelItem}>Category</li>
                    <li className={s.labelItem}>Price</li>
                    <li className={s.labelItem}>Quantity</li>
                    <li className={s.labelItem}>Vendor's name</li>
                    <li className={s.labelItem}>
                        Vender's
                        <br />
                        Reg Code
                    </li>
                </ul>
                <div className={s.inputs}>
                    <Input
                        onChange={e => onChangeInput(e, 'name')}
                        value={value.name}
                        heightContainer={38}
                    />
                    <Input
                        onChange={e => onChangeInput(e, 'category')}
                        value={value.category}
                        heightContainer={38}
                    />
                    <Input
                        onChange={e => onChangeInput(e, 'price')}
                        value={value.price}
                        heightContainer={38}
                    />
                    <Input
                        onChange={e => onChangeInput(e, 'quantity')}
                        value={value.quantity}
                        heightContainer={38}
                    />
                    <Input
                        onChange={e => onChangeInput(e, 'vendor')}
                        value={value.vendor}
                        heightContainer={38}
                    />
                    <Input heightContainer={38} />
                </div>
            </form>
            <Button onClick={onSubmitForm} size={'small'}>
                Create
            </Button>
        </div>
    )
}
