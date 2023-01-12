import { FC, useCallback, useEffect, useState } from 'react'
import s from './CreateProductForm.module.scss'
import cls from 'classnames'
import { Button, Checkbox, Input, InputWithHint } from 'shared/ui'
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'
import { getProductsList, thunkFetchProductList } from 'entities/Products'
import { getCategoryList } from 'entities/Categories'
import {
    createProductActions,
    createProductReducer,
} from '../../model/slice/createProductSlice'
import { getVendorsList } from 'entities/Vendors/model/selectors/getVendorsList/getVendorsList'
import { thunkCreateProduct } from '../../model/services/thunkCreateProduct'
import { getCreateProductStatus } from '../../model/selectors/getCreateProductStatus/getCreateProductStatus'
import { getCreateProductError } from '../../model/selectors/getCreateProductError/getCreateProductError'
import closeIcon from 'shared/assets/images/icons/close.svg'
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/config/components/DynamicModuleLoader'
import { getCreateProductName } from '../../model/selectors/getCreateProductName/getCreateProductName'
import { getCreateProductCategories } from '../../model/selectors/getCreateProductCategories/getCreateProductCategories'
import { getCreateProductVendorName } from '../../model/selectors/getCreateProductVendorName/getCreateProductVendorName'
import { getCreateProductUnit } from '../../model/selectors/getCreateProductUnit/getCreateProductUnit'
import { getCreateProductPrice } from '../../model/selectors/getCreateProductPrice/getCreateProductPrice'
import { getCreateProductQuantity } from '../../model/selectors/getCreateProductQuantity/getCreateProductQuantity'
import { getCreateProductRegCode } from '../../model/selectors/getCreateProductRegCode/getCreateProductRegCode'

interface CreateProductFormProps {
    className?: string
    onClose: () => void
}

const initialState: ReducersList = {
    createProduct: createProductReducer,
}

export const CreateProductForm: FC<CreateProductFormProps> = ({
    className,
    onClose,
}) => {
    const [validationError, setValidationError] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [categoriesFocus, setCategoriesFocus] = useState(false)
    const [vendorsFocus, setVendorsFocus] = useState(false)
    const [unitFocus, setUnitFocus] = useState(false)
    const name = useAppSelector(getCreateProductName)
    const category = useAppSelector(getCreateProductCategories)
    const vendor = useAppSelector(getCreateProductVendorName)
    const unit = useAppSelector(getCreateProductUnit)
    const price = useAppSelector(getCreateProductPrice)
    const quantity = useAppSelector(getCreateProductQuantity)
    const regCode = useAppSelector(getCreateProductRegCode)

    const productsList = useAppSelector(getProductsList)
    const categoriesList = useAppSelector(getCategoryList)
    const vendorsList = useAppSelector(getVendorsList)
    const status = useAppSelector(getCreateProductStatus)
    const error = useAppSelector(getCreateProductError)
    const dispatch = useAppDispatch()

    const selectedVendor = vendorsList.find(
        item => item.name === vendor || item.code === regCode
    )

    const onSubmitForm = async () => {
        setValidationError(false)
        if (!name && !category && !vendor && !unit && !price && !quantity) {
            return setValidationError(true)
        }
        const response = await dispatch(
            thunkCreateProduct({
                name,
                category: category || 'unSorted',
                vendor: selectedVendor.code,
                unit,
                price: Number(price),
                quantity: Number(quantity),
            })
        )
        // @ts-ignore
        if (response.payload?.data) {
            dispatch(thunkFetchProductList())
            onClose()
        }
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
        dispatch(createProductActions.setRegCode(''))
    }
    const onChangeRegCode = e => {
        dispatch(createProductActions.setRegCode(e.target.value))
        dispatch(createProductActions.setVendor(''))
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

    useEffect(() => {
        if (selectedVendor) {
            dispatch(createProductActions.setRegCode(selectedVendor.code))
            dispatch(createProductActions.setVendor(selectedVendor.name))
        }
    }, [regCode, vendor])

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
                                position={'right'}
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
                                position={'right'}
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
                                onChange={onChangeRegCode}
                                disabled={status}
                                value={regCode}
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
                {error && <p>Server Error</p>}
                {validationError && <p>Validation Error</p>}
            </div>
        </DynamicModuleLoader>
    )
}
