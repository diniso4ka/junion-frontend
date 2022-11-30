import { FC, useEffect, useState } from 'react'
import s from './FilterMenu.module.scss'
import cls from 'classnames'

import { useAppDispatch, useAppSelector } from 'app/store/types'
import { useSearchParams } from 'react-router-dom'
import { thunkFetchFilteredProductList } from 'app/store/slices/products/thunk'
import { IProductsFilter } from 'shared/types/filters'

import { Button, Input } from 'shared/ui'
import { ProductsFilterDefault } from 'shared/helpers/degaultValues/filters'
import { InputWithHint } from 'shared/ui'
import { setFilters } from 'app/store/slices/productsFilters/productsFilters'

interface ProfileMenuProps {
    onClose?: () => void
    onClear?: () => void
    className?: string
    onClick?: () => void
}

export const FilterMenu: FC<ProfileMenuProps> = ({ className, onClose }) => {
    const { categories, items } = useAppSelector(state => state.products.data)
    const dispatch = useAppDispatch()
    const { filters, queryString } = useAppSelector(
        state => state.productsFilters
    )
    const [categoriesFocus, setCategoriesFocus] = useState(false)
    const [productsFocus, setProductsFocus] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filtersValue, setFiltersValue] = useState<IProductsFilter>({})

    const onHandleProductHint = hint => {
        setFiltersValue(prev => ({ ...prev, name: hint }))
    }
    const onHandleCategoryHint = hint => {
        setFiltersValue(prev => ({ ...prev, category: hint }))
    }

    const onSubmitFilters = () => {
        if (filtersValue) {
            dispatch(setFilters(filtersValue))
        }
        onClose()
    }

    useEffect(() => {
        if (queryString) {
            dispatch(thunkFetchFilteredProductList(queryString))
            setSearchParams(queryString)
            if (!filters) {
                setFiltersValue(ProductsFilterDefault)
            } else {
                setFiltersValue(filters)
            }
        } else {
            setFiltersValue(ProductsFilterDefault)
            dispatch(thunkFetchFilteredProductList(''))
            setSearchParams('')
        }
    }, [filters, queryString])

    useEffect(() => {
        // @ts-ignore
        const params = [...searchParams]
        const objParams = {}
        if (params.length > 0) {
            Object.values(params).forEach(
                item => (objParams[item[0]] = item[1])
            )
            dispatch(setFilters(objParams))
            setFiltersValue(objParams)
        }
    }, [])

    return (
        <div className={cls(s.FilterMenu, className)}>
            <ul className={s.filterWrapper}>
                <li className={s.filterItem}>
                    <h4>Products</h4>
                    <InputWithHint
                        onChange={e =>
                            setFiltersValue(prev => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        value={filtersValue.name}
                        onFocus={() => setProductsFocus(true)}
                        // @ts-ignore
                        hint={items.map(item => item.name)}
                        isHintOpen={productsFocus}
                        onCloseHint={() => setProductsFocus(false)}
                        onHandleSelect={e => onHandleProductHint(e)}
                    />
                </li>
                <li className={s.filterItem}>
                    <h4>Category</h4>
                    <InputWithHint
                        onChange={e =>
                            setFiltersValue(prev => ({
                                ...prev,
                                category: e.target.value,
                            }))
                        }
                        value={filtersValue.category}
                        onFocus={() => setCategoriesFocus(true)}
                        hint={categories.map(item => item._id)}
                        isHintOpen={categoriesFocus}
                        onCloseHint={() => setCategoriesFocus(false)}
                        onHandleSelect={e => onHandleCategoryHint(e)}
                    />
                </li>
                <li className={s.filterItem}>
                    <h4>Price</h4>
                    <div className={s.range}>
                        <Input
                            onChange={e =>
                                setFiltersValue(prev => ({
                                    ...prev,
                                    price_min: e.target.value,
                                }))
                            }
                            value={filtersValue.price_min}
                            variant={'secondary'}
                            sizeContainer={'adaptive'}
                        />
                        <span className={s.rangeHelp}>to</span>
                        <Input
                            onChange={e =>
                                setFiltersValue(prev => ({
                                    ...prev,
                                    price_max: e.target.value,
                                }))
                            }
                            value={filtersValue.price_max}
                            variant={'secondary'}
                            sizeContainer={'adaptive'}
                        />
                    </div>
                </li>
                <li className={s.filterItem}>
                    <h4>Vendor</h4>
                    <Input
                        onChange={e =>
                            setFiltersValue(prev => ({
                                ...prev,
                                vendor: e.target.value,
                            }))
                        }
                        value={filtersValue.vendor}
                        variant={'secondary'}
                        sizeContainer={'adaptive'}
                    />
                </li>
                <li className={s.filterItem}>
                    <h4>Owner</h4>
                    <Input
                        onChange={e =>
                            setFiltersValue(prev => ({
                                ...prev,
                                owner: e.target.value,
                            }))
                        }
                        value={filtersValue.owner}
                        variant={'secondary'}
                        sizeContainer={'adaptive'}
                    />
                </li>
            </ul>
            <div className={s.buttonWrapper}>
                <Button
                    size={'small'}
                    className={s.button}
                    onClick={onSubmitFilters}
                >
                    Search
                </Button>
            </div>
        </div>
    )
}
