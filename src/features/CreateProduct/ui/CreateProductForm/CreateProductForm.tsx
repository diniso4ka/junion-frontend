import { FC, useState } from 'react'
import s from './CreateProductForm.module.scss'
import cls from 'classnames'
import { Button, Checkbox, Input, InputWithHint } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'app/store/types'
import {
    getProductsList,
    productsActions,
    thunkFetchProductList,
} from 'entities/Products'
import { getCategoryList } from 'entities/Categories'
import { createProductActions } from '../../model/slice/createProductSlice'
import { getCreateProductForm } from '../../model/selectors/getCreateProductForm/getCreateProductForm'
import { getVendorsList } from 'entities/Vendors/model/selectors/getVendorsList/getVendorsList'
import { thunkCreateProduct } from '../../model/services/thunkCreateProduct'
import { getCreateProductStatus } from '../../model/selectors/getCreateProductStatus/getCreateProductStatus'
import { getCreateProductError } from '../../model/selectors/getCreateProductError/getCreateProductError'

interface CreateProductFormProps {
    className?: string
    onClose: () => void
}

export const CreateProductForm: FC<CreateProductFormProps> = ({
    className,
    onClose,
}) => {
    const [nameFocus, setNameFocus] = useState(false)
    const [categoriesFocus, setCategoriesFocus] = useState(false)
    const [vendorsFocus, setVendorsFocus] = useState(false)
    const [unitFocus, setUnitFocus] = useState(false)
    const [withDiscount, setWithDiscount] = useState(false)
    const { name, category, vendor, unit, price, quantity, discountPrice } =
        useAppSelector(getCreateProductForm)
    const productsList = useAppSelector(getProductsList)
    const categoriesList = useAppSelector(getCategoryList)
    const vendorsList = useAppSelector(getVendorsList)
    const status = useAppSelector(getCreateProductStatus)
    const error = useAppSelector(getCreateProductError)
    const dispatch = useAppDispatch()

    const selectedVendor = vendorsList.find(item => item.name === vendor)

    const onSubmitForm = async () => {
        if (
            !!name &&
            !!category &&
            !!vendor &&
            !!unit &&
            !!price &&
            !!quantity
        ) {
            const response = await dispatch(
                thunkCreateProduct({
                    name,
                    category,
                    vendor: selectedVendor.code,
                    unit,
                    price: Number(price),
                    quantity: Number(quantity),
                    // discountPrice: discountPrice ? Number(discountPrice) : 0,
                })
            )
            // @ts-ignore
            if (response.payload?.data) {
                dispatch(thunkFetchProductList())
                onClose()
            }
        }
    }

    const onHandleChangeDiscountCheckbox = () => {
        setWithDiscount(!withDiscount)
    }

    const onHandleNameHint = hint => {
        dispatch(createProductActions.setName(hint))
    }
    const onHandleCategoryHint = hint => {
        dispatch(createProductActions.setCategory(hint))
    }
    const onHandleVendorHint = hint => {
        dispatch(createProductActions.setVendor(hint))
    }
    const onHandleUnitHint = hint => {
        dispatch(createProductActions.setUnit(hint))
    }

    const onChangeName = e => {
        dispatch(createProductActions.setName(e.target.value))
    }
    const onChangeCategory = e => {
        dispatch(createProductActions.setCategory(e.target.value))
    }
    const onChangeVendor = e => {
        dispatch(createProductActions.setVendor(e.target.value))
    }
    const onChangePrice = e => {
        dispatch(createProductActions.setPrice(e.target.value))
    }
    const onChangeUnit = e => {
        dispatch(createProductActions.setUnit(e.target.value))
    }
    const onChangeQuantity = e => {
        dispatch(createProductActions.setQuantity(e.target.value))
    }
    const onChangeDiscount = e => {
        dispatch(createProductActions.setDiscountPrice(e.target.value))
    }
    return (
        <div className={cls(s.CreateProductForm, className)}>
            <h1 className={s.title}>New product</h1>
            <form className={s.form}>
                <ul className={s.items}>
                    <li className={s.inputItem}>
                        <label className={s.label}>Product name</label>
                        <InputWithHint
                            disabled={status}
                            value={name}
                            onChange={onChangeName}
                            className={s.input}
                            hint={productsList.map(item => item.name)}
                            onFocus={() => setNameFocus(true)}
                            onCloseHint={() => setNameFocus(false)}
                            onHandleSelect={e => onHandleNameHint(e)}
                            isHintOpen={nameFocus}
                            variant={'outline'}
                        />
                    </li>
                    <li className={s.inputItem}>
                        <label className={s.label}>Categories</label>
                        <InputWithHint
                            disabled={status}
                            onChange={onChangeCategory}
                            value={category}
                            className={s.input}
                            hint={categoriesList.map(item => item._id)}
                            onFocus={() => setCategoriesFocus(true)}
                            onCloseHint={() => setCategoriesFocus(false)}
                            onHandleSelect={e => onHandleCategoryHint(e)}
                            isHintOpen={categoriesFocus}
                            variant={'outline'}
                        />
                    </li>
                    <li className={s.inputItem}>
                        <label className={s.label}>Price</label>
                        <div className={s.priceFrom}>
                            <Input
                                disabled={status}
                                value={price}
                                onChange={onChangePrice}
                                className={s.inputMedium}
                                variant={'outline'}
                            />
                            <div className={s.subInput}>
                                <label className={s.subLabel}>
                                    <Checkbox
                                        onClick={onHandleChangeDiscountCheckbox}
                                        value={!withDiscount}
                                        className={s.checkbox}
                                    />
                                    Discount
                                </label>
                                <Input
                                    value={discountPrice}
                                    onChange={onChangeDiscount}
                                    disabled={!withDiscount || status}
                                    className={cls(
                                        s.inputSmall,
                                        s.discountInput
                                    )}
                                    variant={'outline'}
                                />
                                %
                            </div>
                        </div>
                    </li>
                    <li className={s.inputItem}>
                        <label className={s.label}>Quantity</label>
                        <div className={s.priceFrom}>
                            <Input
                                disabled={status}
                                value={quantity}
                                onChange={onChangeQuantity}
                                className={s.inputMedium}
                                variant={'outline'}
                            />
                            <div className={s.subInput}>
                                <label className={s.subLabel}>Unit</label>
                                <InputWithHint
                                    disabled={status}
                                    hintSize={'adaptive'}
                                    onFocus={() => setUnitFocus(true)}
                                    onCloseHint={() => setUnitFocus(false)}
                                    value={unit}
                                    onChange={onChangeUnit}
                                    isHintOpen={unitFocus}
                                    onHandleSelect={onHandleUnitHint}
                                    hint={['kg', 'pcs']}
                                    className={s.inputSmall}
                                    variant={'outline'}
                                />
                            </div>
                        </div>
                    </li>
                    <li className={s.inputItem}>
                        <label className={s.label}>Vendor's name</label>
                        <InputWithHint
                            disabled={status}
                            onChange={onChangeVendor}
                            value={vendor}
                            className={s.input}
                            hint={vendorsList.map(item => item.name)}
                            onFocus={() => setVendorsFocus(true)}
                            onCloseHint={() => setVendorsFocus(false)}
                            onHandleSelect={e => onHandleVendorHint(e)}
                            isHintOpen={vendorsFocus}
                            variant={'outline'}
                        />
                    </li>
                    <li className={s.inputItem}>
                        <label className={s.label}>
                            Vendor's <br />
                            Reg Code
                        </label>
                        <Input
                            disabled={status}
                            value={selectedVendor ? selectedVendor.code : ''}
                            variant={'outline'}
                            className={s.inputMedium}
                        />
                    </li>
                </ul>
            </form>
            <div className={s.buttonWrapper}>
                <Button
                    isLoading={status}
                    className={s.button}
                    onClick={onSubmitForm}
                    size={'small'}
                >
                    Create
                </Button>
            </div>
            {error && <p> Server Error</p>}
        </div>
    )
}
