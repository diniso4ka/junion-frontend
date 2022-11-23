import { FC, useEffect, useRef, useState } from 'react'
import s from './FilterMenu.module.scss'
import cls from 'classnames'

import { useAppDispatch } from 'app/store/types'
import { useSearchParams } from 'react-router-dom'
import { createQueryParams } from 'shared/helpers/filters/createQueryParams'
import {
    thunkFetchFiltredProductList,
    thunkFetchProductList,
} from 'app/store/slices/products/thunk'
import { IProductsFilter } from 'shared/types/filters'

import { Button, Input } from 'components'
import { clearFiltredItems } from 'app/store/slices/products/productsSlice'
import { ProductsFilterDefault } from 'shared/helpers/degaultValues/filters'

interface ProfileMenuProps {
    setIsOpen?: (active) => void
    className?: string
    onClick?: () => void
}

export const FilterMenu: FC<ProfileMenuProps> = ({ className, setIsOpen }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useAppDispatch()
    const [filtersValue, setFiltersValue] = useState<IProductsFilter>(
        ProductsFilterDefault
    )
    const [filters, setFilters] = useState({})
    const [queryParams, setQueryParams] = useState<string>('')

    const onSubmitFilters = () => {
        setParamFilters(filtersValue)
        const params = createQueryParams(filtersValue)
        if (params) {
            dispatch(thunkFetchFiltredProductList(params))
        } else {
            dispatch(thunkFetchProductList())
        }
        setIsOpen(false)
    }

    const setParamFilters = params => {
        let filters: any = {}
        for (const i in params) {
            if (params[i].length > 0) {
                filters = { ...params, [i]: params[i] }
            }
        }
        setFilters(() => ({ ...filters }))
        setFiltersValue(() => ({ ...filters }))
        setQueryParams(createQueryParams(filters))
    }

    const onClearFilters = () => {
        setSearchParams({})
        setFiltersValue(ProductsFilterDefault)
        setIsOpen(false)
    }

    useEffect(() => {
        const params: IProductsFilter = {}
        const name = searchParams.get('name')
        if (name) {
            params.name = name
        }
        const category = searchParams.get('category')
        if (category) {
            params.category = category
        }
        const vendor = searchParams.get('vendor')
        if (vendor) {
            params.vendor = vendor
        }
        const owner = searchParams.get('owner')
        if (owner) {
            params.owner = owner
        }
        const price_min = searchParams.get('price_min')
        if (price_min) {
            params.price_min = price_min
        }
        const price_max = searchParams.get('price_max')
        if (price_max) {
            params.price_max = price_max
        }
        if (Object.keys(params).length > 0) {
            setParamFilters(params)
        }
    }, [])

    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            setFiltersValue(prev => ({ ...filters }))
            setSearchParams({ ...filters })
            dispatch(thunkFetchFiltredProductList(createQueryParams(filters)))
        } else {
            dispatch(clearFiltredItems())
        }
    }, [filters])

    return (
        <div className={cls(s.FilterMenu, className)}>
            <ul className={s.filterWrapper}>
                <li className={s.filterItem}>
                    <h4>Products</h4>
                    <Input
                        onChange={e =>
                            setFiltersValue(prev => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        value={filtersValue.name}
                        variant={'secondary'}
                        sizeContainer={'adaptive'}
                    />
                </li>
                <li className={s.filterItem}>
                    <h4>Category</h4>
                    <Input
                        onChange={e =>
                            setFiltersValue(prev => ({
                                ...prev,
                                category: e.target.value,
                            }))
                        }
                        value={filtersValue.category}
                        variant={'secondary'}
                        sizeContainer={'adaptive'}
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
                    send
                </Button>
                <Button
                    size={'small'}
                    className={s.button}
                    onClick={onClearFilters}
                >
                    clear
                </Button>
            </div>
        </div>
    )
}
