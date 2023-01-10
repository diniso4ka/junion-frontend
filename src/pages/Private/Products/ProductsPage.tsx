import { FC, useEffect, useState } from 'react'
import { Text } from 'shared/ui'
import s from './ProductsPage.module.scss'
import cls from 'classnames'

import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'

import { getDate } from 'shared/helpers/date/getDate'
import { searchProductsByIncludes } from 'shared/helpers/filters/search'

import { AdvancedSearch, Button } from 'shared/ui'
import { ProductsTable } from 'entities/Products'
import { FilterMenu } from 'features/ProductFilters'
import {
    getProductsFilteredList,
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
import { SideButton } from '../../../shared/ui/SideButton'
import { ProductType } from '../../../entities/Products/model/types/ProductsSchema'
import {
    DynamicModuleLoader,
    ReducersList,
} from '../../../shared/config/components/DynamicModuleLoader'
import { updateProductReducer } from 'features/UpdateProduct/model/slice/updateProductSlice'
import { getUpdateProductSelectedList } from '../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList'
import { thunkDeleteProduct } from '../../../features/UpdateProduct/model/services/thunkDeleteProduct'
import { getProductsError } from '../../../entities/Products/model/selectors/getProductsError/getProductsError'
import { ConfirmModal } from '../../../shared/ui/ConfirmModal/ConfirmModal'
import { UpdateProductModal } from '../../../features/UpdateProduct/ui/UpdateProductModal/UpdateProductModal'

const initialState: ReducersList = {
    updateProduct: updateProductReducer,
}

const ProductsPage: FC = () => {
    const [items, setItems] = useState<ProductType[]>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false)
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false)
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [canClear, setCanClear] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useAppDispatch()

    const filters = useAppSelector(getProductFiltersData)
    const selectedItems = useAppSelector(getUpdateProductSelectedList)
    const filteredProductsList = useAppSelector(getProductsFilteredList)
    const error = useAppSelector(getProductsError)
    const productsList = useAppSelector(getProductsList)
    const status = useAppSelector(getProductsStatus)
    const date = getDate()

    const filteredItems = searchProductsByIncludes(items, searchValue)
        .reverse()
        .filter(item => item.status !== 'deleted')

    const onClear = () => {
        dispatch(productFiltersActions.clearFilters())
        dispatch(productsActions.clearFilteredProductsList())
        setSearchParams('')
        setSearchValue('')
        setFilterIsOpen(false)
    }

    const onHandleDelete = () => {
        selectedItems.forEach(item => {
            dispatch(thunkDeleteProduct(item._id))
        })
        setConfirmModalIsOpen(false)
    }

    const autoSetFilters = async objParams => {
        const response = await dispatch(
            thunkGetFilteredProductsList(createQueryParams(objParams))
        )
        // @ts-ignore
        if (response.payload.data) {
            // @ts-ignore
            setItems(response.payload.data.result)
        }
        await dispatch(productFiltersActions.setFilters(objParams))
    }

    useEffect(() => {
        // @ts-ignore
        const params = [...searchParams]
        const objParams = {}
        if (params.length > 0) {
            Object.values(params).forEach(
                item => (objParams[item[0]] = item[1])
            )
            autoSetFilters(objParams)
        } else {
            setItems(productsList)
        }
        return () => {
            dispatch(productFiltersActions.clearFilters())
            dispatch(productsActions.clearFilteredProductsList())
            dispatch(productsActions.clearSort())
        }
    }, [])

    useEffect(() => {
        if (!!filters) {
            setCanClear(!Object.values(filters).every(item => !item))
        }
    }, [filters])

    useEffect(() => {
        setItems(filteredProductsList)
    }, [filteredProductsList])

    return (
        <DynamicModuleLoader reducers={initialState} removeAfterUnmount={true}>
            <div className={cls(s.ProductsPage)}>
                <div className={s.header}>
                    <Text className={s.title} title='Products' />
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
                        advanced={true}
                        className={s.productsSearch}
                    >
                        <FilterMenu
                            isLoading={status}
                            onClose={() => setFilterIsOpen(false)}
                        />
                    </AdvancedSearch>
                    <Button
                        theme={'orange'}
                        onClick={() => setModalIsOpen(true)}
                        variant={'rounded'}
                    >
                        Add new product
                    </Button>
                    <Text
                        className={s.date}
                        date={`${date.mounth} ${date.number}, ${date.year}`}
                    />
                </div>
                <ProductsTable
                    isLoading={status}
                    items={filteredItems}
                    className={s.table}
                    error={!!error}
                />
                {modalIsOpen && (
                    <CreateProductModal
                        isOpen={modalIsOpen}
                        onClose={() => setModalIsOpen(false)}
                    />
                )}
                {updateModalIsOpen && (
                    <UpdateProductModal
                        isOpen={updateModalIsOpen}
                        onClose={() => setUpdateModalIsOpen(false)}
                        item={selectedItems[0]}
                    />
                )}
                {confirmModalIsOpen && (
                    <ConfirmModal
                        onConfirm={onHandleDelete}
                        isOpen={confirmModalIsOpen}
                        onClose={() => setConfirmModalIsOpen(false)}
                        text={'Do you really want to remove it?'}
                    />
                )}
                {!(selectedItems.length < 1) && (
                    <div className={s.btns}>
                        <SideButton
                            active={modalIsOpen}
                            onClick={() => setUpdateModalIsOpen(true)}
                            disable={selectedItems.length !== 1}
                            variant='update'
                            className={s.update}
                        />
                        <SideButton
                            active={confirmModalIsOpen}
                            onClick={() => setConfirmModalIsOpen(true)}
                            disable={selectedItems.length < 1}
                            variant='delete'
                            className={s.delete}
                        />
                    </div>
                )}
            </div>
        </DynamicModuleLoader>
    )
}

export default ProductsPage
