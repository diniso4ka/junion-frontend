import { FC, useEffect, useState } from 'react'
import s from './ProductsPage.module.scss'
import cls from 'classnames'

import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'

import { getDate } from 'shared/helpers/date/getDate'
import { searchByIncludes } from 'shared/helpers/filters/search'

import { AdvancedSearch, Button, Modal } from 'shared/ui'
import { ProductsTable } from 'entities/Products'
import { FilterMenu } from 'features/ProductFilters'
import {
    getFilteredProductsList,
    getProductsList,
    getProductsStatus,
    productsActions,
    thunkGetFilteredProductsList,
} from 'entities/Products'
import { useSearchParams } from 'react-router-dom'

import { getProductFiltersData } from 'features/ProductFilters/model/selectors/getProductFiltersData/getProductFiltersData'
import { productFiltersActions } from 'features/ProductFilters'
import { createQueryParams } from 'shared/helpers/filters/createQueryParams'
import { CreateProductModal } from 'features/CreateProduct/ui/CreateProductModal/CreateProductModal'
import { getAuthData } from 'entities/User'

const ProductsPage: FC = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(getAuthData)
    const filters = useAppSelector(getProductFiltersData)
    const productsList = useAppSelector(getProductsList)
    const filteredProductsList = useAppSelector(getFilteredProductsList)
    const status = useAppSelector(getProductsStatus)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [canClear, setCanClear] = useState<boolean>(false)
    const date = getDate()
    const [searchParams, setSearchParams] = useSearchParams()
    const filteredItems = searchByIncludes(
        filteredProductsList.length ? filteredProductsList : productsList,
        searchValue
    )

    const onClear = () => {
        dispatch(productFiltersActions.clearFilters())
        dispatch(productsActions.clearFilteredProductsList())
        setSearchParams('')
        setSearchValue('')
        setFilterIsOpen(false)
    }

    useEffect(() => {
        // @ts-ignore
        const params = [...searchParams]
        const objParams = {}
        if (params.length > 0) {
            Object.values(params).forEach(
                item => (objParams[item[0]] = item[1])
            )
            dispatch(productFiltersActions.setFilters(objParams))
            dispatch(thunkGetFilteredProductsList(createQueryParams(objParams)))
        }
        return () => {
            dispatch(productFiltersActions.clearFilters())
            dispatch(productsActions.clearFilteredProductsList())
        }
    }, [])

    useEffect(() => {
        if (!!filters) {
            setCanClear(!Object.values(filters).every(item => !item))
        }
    }, [filters])

    return (
        <div className={cls(s.ProductsPage)}>
            <div className={s.navigation}>
                <h1>Products</h1>
                <AdvancedSearch
                    value={searchValue}
                    onChange={e => setSearchValue(e)}
                    onClick={e => e.stopPropagation()}
                    onOpen={() => setFilterIsOpen(true)}
                    onToggleOpen={() => setFilterIsOpen(!filterIsOpen)}
                    onClose={() => setFilterIsOpen(false)}
                    canClear={!!searchValue || canClear}
                    isOpened={filterIsOpen}
                    onClear={() => onClear()}
                >
                    <FilterMenu
                        isLoading={status}
                        onClose={() => setFilterIsOpen(false)}
                    />
                </AdvancedSearch>
                <Button
                    // disabled={user.role !== 'superadmin'}
                    onClick={() => setModalIsOpen(true)}
                    variant={'rounded'}
                >
                    Add new product
                </Button>
                <p
                    className={s.date}
                >{`${date.mounth} ${date.number}, ${date.year}`}</p>
            </div>
            <ProductsTable
                isLoading={status}
                items={filteredItems}
                className={s.table}
            />
            {modalIsOpen && (
                <CreateProductModal
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                />
            )}
        </div>
    )
}

export default ProductsPage
