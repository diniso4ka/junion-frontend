import { FC, useEffect, useState } from 'react'
import s from './UpdateProductFrom.module.scss'
import cls from 'classnames'
import closeIcon from '../../../../shared/assets/images/icons/close.svg'
import { Button, Checkbox, Input, InputWithHint } from '../../../../shared/ui'
import {
    DynamicModuleLoader,
    ReducersList,
} from '../../../../shared/config/components/DynamicModuleLoader'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import {
    getProductsList,
    thunkFetchProductList,
} from '../../../../entities/Products'
import { getCategoryList } from '../../../../entities/Categories'
import { getVendorsList } from '../../../../entities/Vendors/model/selectors/getVendorsList/getVendorsList'
import { getUpdateProductName } from '../../model/selectors/getUpdateProductName/getUpdateProductName'
import { getUpdateProductCategories } from '../../model/selectors/getUpdateProductCategories/getUpdateProductCategories'
import { getUpdateProductVendorName } from '../../model/selectors/getUpdateProductVendorName/getUpdateProductVendorName'
import { getUpdateProductUnit } from '../../model/selectors/getUpdateProductUnit/getUpdateProductUnit'
import { getUpdateProductPrice } from '../../model/selectors/getUpdateProductPrice/getUpdateProductPrice'
import { getUpdateProductQuantity } from '../../model/selectors/getUpdateProductQuantity/getUpdateProductQuantity'
import { getUpdateProductDiscountPrice } from '../../model/selectors/getUpdateProductDiscountPrice/getUpdateProductDiscountPrice'
import {
    updateProductActions,
    updateProductReducer,
} from '../../model/slice/updateProductSlice'
import { ProductType } from 'entities/Products/model/types/ProductsSchema'
import { thunkUpdateProduct } from '../../model/services/thunkUpdateProduct'
import { getUpdateProductId } from '../../model/selectors/getUpdateProductId/getUpdateProductId'
import { getUpdateProductError } from '../../model/selectors/getUpdateProductError/getUpdateProductError'
import { getUpdateProductStatus } from '../../model/selectors/getUpdateProductStatus/getUpdateProductStatus'
import { discountConvertInNumber } from '../../../../shared/helpers/math/discountPrice'

interface UpdateProductFormProps {
    className?: string
    onClose: () => void
    item: ProductType
}

const initialState: ReducersList = {
    updateProduct: updateProductReducer,
}

export const UpdateProductForm: FC<UpdateProductFormProps> = ({
    className,
    onClose,
    item,
}) => {
    const [nameFocus, setNameFocus] = useState(false)
    const [categoriesFocus, setCategoriesFocus] = useState(false)
    const [vendorsFocus, setVendorsFocus] = useState(false)
    const [unitFocus, setUnitFocus] = useState(false)
    const name = useAppSelector(getUpdateProductName)
    const category = useAppSelector(getUpdateProductCategories)
    const vendor = useAppSelector(getUpdateProductVendorName)
    const unit = useAppSelector(getUpdateProductUnit)
    const price = useAppSelector(getUpdateProductPrice)
    const quantity = useAppSelector(getUpdateProductQuantity)
    const discountPrice = useAppSelector(getUpdateProductDiscountPrice)
    const _id = useAppSelector(getUpdateProductId)

    const productsList = useAppSelector(getProductsList)
    const categoriesList = useAppSelector(getCategoryList)
    const vendorsList = useAppSelector(getVendorsList)
    const status = useAppSelector(getUpdateProductStatus)
    const error = useAppSelector(getUpdateProductError)

    const [validationError, setValidationError] = useState(false)
    const [withDiscount, setWithDiscount] = useState(!!item.discountPrice)
    const dispatch = useAppDispatch()

    const selectedVendor = vendorsList.find(item => item.name === vendor)

    const onSubmitForm = async () => {
        setValidationError(false)
        if (!name && !category && !vendor && !unit && !price && !quantity) {
            return setValidationError(true)
        }
        const response = await dispatch(
            thunkUpdateProduct({
                name,
                category: category.replace(/\s/g, ''),
                vendor: selectedVendor.code,
                unit,
                price: Number(price),
                quantity: Number(quantity),
                discountPrice: withDiscount
                    ? discountConvertInNumber(price, discountPrice)
                    : 0,
                id: _id,
            })
        )
        // @ts-ignore
        if (response.payload?.data) {
            dispatch(thunkFetchProductList())
            onClose()
        }
    }

    const onHandleChangeDiscountCheckbox = () => {
        setWithDiscount(!withDiscount)
    }

    const onHandleNameHint = hint => {
        dispatch(updateProductActions.setName(hint))
    }
    const onHandleCategoryHint = hint => {
        dispatch(updateProductActions.setCategory(hint))
    }
    const onHandleVendorHint = hint => {
        dispatch(updateProductActions.setVendor(hint))
    }
    const onHandleUnitHint = hint => {
        dispatch(updateProductActions.setUnit(hint))
    }

    const onChangeName = e => {
        dispatch(updateProductActions.setName(e.target.value))
    }
    const onChangeCategory = e => {
        dispatch(updateProductActions.setCategory(e.target.value))
    }
    const onChangeVendor = e => {
        dispatch(updateProductActions.setVendor(e.target.value))
    }
    const onChangePrice = e => {
        dispatch(updateProductActions.setPrice(e.target.value))
    }
    const onChangeUnit = e => {
        dispatch(updateProductActions.setUnit(e.target.value))
    }
    const onChangeQuantity = e => {
        dispatch(updateProductActions.setQuantity(e.target.value))
    }
    const onChangeDiscount = e => {
        dispatch(updateProductActions.setDiscountPrice(e.target.value))
    }

    useEffect(() => {
        if (item) {
            dispatch(
                updateProductActions.setValues({
                    ...item,
                    vendor: vendorsList.find(
                        vendor => item.vendor === vendor.code
                    ).name,
                })
            )
        }
    }, [])

    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <div className={cls(s.CreateProductForm, className)}>
                <img
                    onClick={onClose}
                    className={s.closeIcon}
                    src={closeIcon}
                />
                <h1 className={s.title}>Change product details</h1>
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
                                            onClick={
                                                onHandleChangeDiscountCheckbox
                                            }
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
                                value={
                                    selectedVendor ? selectedVendor.code : ''
                                }
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
                        Save
                    </Button>
                </div>
                {error && <p>Server Error</p>}
                {validationError && <p>Validation Error</p>}
            </div>
        </DynamicModuleLoader>
    )
}
