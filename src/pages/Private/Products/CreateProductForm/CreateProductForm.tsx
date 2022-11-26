import { FC } from 'react'
import s from './CreateProductForm.module.scss'
import cls from 'classnames'
import { Button, Input } from 'components'

interface CreateProductFormProps {
    className?: string
}

export const CreateProductForm: FC<CreateProductFormProps> = ({
    className,
}) => {
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
                    <Input heightContainer={38} />
                    <Input heightContainer={38} />
                    <Input heightContainer={38} />
                    <Input heightContainer={38} />
                    <Input heightContainer={38} />
                    <Input heightContainer={38} />
                </div>
            </form>
            <Button size={'small'}>Create</Button>
        </div>
    )
}
