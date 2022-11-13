import { FC, useEffect, useState } from 'react'
import s from './FilterMenu.module.scss'
import cls from 'classnames'

import { useAppDispatch } from 'app/store/types'
import { createQueryParams } from 'shared/helpers/filters/createQueryParams'
import {
    thunkFetchFiltredProductList,
    thunkFetchProductList,
} from 'app/store/slices/products/thunk'
import { IProductsFilter } from 'shared/types/filters'

import { Button, Input } from 'components'
import { useLocation, useNavigate } from 'react-router'

interface ProfileMenuProps {
    setIsOpen?: (active) => void
    className?: string
    onClick?: () => void
}

export const FilterMenu: FC<ProfileMenuProps> = ({ className, setIsOpen }) => {
    const navigate = useNavigate()
    const params = useLocation()

    const dispatch = useAppDispatch()
    const [filtersValue, setFiltersValue] = useState<IProductsFilter>({})
    const onSubmitFilters = () => {
        const params = createQueryParams(filtersValue)
        console.log(params)
        if (params) {
            dispatch(thunkFetchFiltredProductList(params))
        } else {
            dispatch(thunkFetchProductList())
        }
        navigate(`?${params}`)
        setIsOpen(false)
    }

    const defaultFilters = async () => {
        if (params.search) {
            const queryParams = params.search.replace('?', '')
            await dispatch(thunkFetchFiltredProductList(queryParams))
            await navigate(`?${queryParams}`)
        }
    }

    useEffect(() => {
        defaultFilters()
    }, [])

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
                <Button className={s.button} onClick={onSubmitFilters}>
                    send
                </Button>
            </div>
        </div>
    )
}
