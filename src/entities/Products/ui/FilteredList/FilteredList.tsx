import { FC, useEffect, useState } from 'react'
import s from './FilteredList.module.scss'
import cls from 'classnames'
import { Checkbox, Text } from 'shared/ui'
import { ProductType } from '../../model/types/ProductsSchema'
import closeIcon from 'shared/assets/images/icons/close.svg'
import { UpdateProductModal } from '../../../../features/UpdateProduct/ui/UpdateProductModal/UpdateProductModal'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import {
    updateProductActions,
    updateProductReducer,
} from '../../../../features/UpdateProduct/model/slice/updateProductSlice'
import { getUpdateProductSelectedList } from '../../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList'
import {
    DynamicModuleLoader,
    ReducersList,
} from '../../../../shared/config/components/DynamicModuleLoader'

interface FilteredListProps {
    className?: string
    title: string
    variant?: 'quantity' | 'price' | 'category'
    data: ProductType[]
    isOpen: boolean
    onClose: () => void
    modalIsOpen: boolean
    modalOnClose: () => void
}

const initialState: ReducersList = {
    updateProduct: updateProductReducer,
}

export const FilteredList: FC<FilteredListProps> = ({
    className,
    data,
    isOpen,
    variant,
    onClose,
    title,
    modalIsOpen,
    modalOnClose,
}) => {
    const dispatch = useAppDispatch()
    const selectedItems = useAppSelector(getUpdateProductSelectedList)
    const onHandleSelect = item => {
        dispatch(updateProductActions.selectProduct(item))
    }
    const allSelected = selectedItems.length === data.length
    const onHandleMultiSelect = () => {
        if (allSelected) {
            dispatch(updateProductActions.clearSelect())
        } else {
            data.forEach(item => {
                if (!selectedItems.find(product => item._id === product._id)) {
                    dispatch(updateProductActions.selectProduct(item))
                }
            })
        }
    }

    useEffect(() => {
        dispatch(updateProductActions.clearSelect())
    }, [data])
    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <div
                className={cls(s.FilteredList, className, {
                    [s.opened]: isOpen,
                })}
            >
                <img
                    onClick={onClose}
                    className={s.closeIcon}
                    src={closeIcon}
                />
                <div className={s.table}>
                    <Text className={s.title} title={title} />
                    {variant === 'price' && (
                        <div className={cls(s.heading, s[variant])}>
                            <Checkbox
                                value={allSelected}
                                onClick={() => onHandleMultiSelect()}
                            />
                            <Text className={s.subtitle} mediumText={'Code'} />
                            <Text className={s.subtitle} mediumText={'Name'} />
                            <Text
                                className={s.subtitle}
                                mediumText={'Price,$'}
                            />
                            <Text
                                className={s.subtitle}
                                mediumText={'Quantity'}
                            />
                            <Text className={s.subtitle} mediumText={'Owner'} />
                        </div>
                    )}
                    {variant === 'category' && (
                        <div className={cls(s.heading)}>
                            <Text className={s.subtitle} mediumText={'Code'} />
                            <Text
                                className={s.subtitle}
                                mediumText={'Category'}
                            />
                            <Text className={s.subtitle} mediumText={'Name'} />
                            <Text
                                className={s.subtitle}
                                mediumText={'Price,$'}
                            />
                            <Text
                                className={s.subtitle}
                                mediumText={'Quantity'}
                            />
                            <Text className={s.subtitle} mediumText={'Owner'} />
                        </div>
                    )}

                    <div className={s.items}>
                        {!data.length && <Text subtitle={'List is clear'} />}
                        {variant === 'price' &&
                            data.map(item => (
                                <div
                                    key={item._id}
                                    className={cls(s.row, s[variant])}
                                >
                                    <Checkbox
                                        value={
                                            !!selectedItems.find(
                                                product =>
                                                    item._id === product._id
                                            )
                                        }
                                        onClick={() => {
                                            onHandleSelect(item)
                                        }}
                                    />
                                    <Text text={item.art ? item.art : 'none'} />
                                    <Text text={item.name} />
                                    <Text text={item.price.toString()} />
                                    <Text text={item.quantity.toString()} />
                                    <Text text={item.owner} />
                                </div>
                            ))}
                        {variant === 'category' &&
                            data.map(item => (
                                <div
                                    key={item._id}
                                    // onClick={() => setSelectedItem(() => item._id)}
                                    className={cls(s.row, s[variant])}
                                >
                                    <Text text={item.art ? item.art : 'none'} />
                                    <Text text={item.category[0]} />
                                    <Text text={item.name} />
                                    <Text text={item.price.toString()} />
                                    <Text text={item.quantity.toString()} />
                                    <Text text={item.owner} />
                                </div>
                            ))}
                    </div>
                </div>
                {modalIsOpen && (
                    <UpdateProductModal
                        isOpen={!!modalIsOpen}
                        onClose={modalOnClose}
                        item={data.find(
                            item => item._id === selectedItems[0]._id
                        )}
                    />
                )}
            </div>
        </DynamicModuleLoader>
    )
}
