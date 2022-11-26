import { FC, useEffect, useRef, useState } from 'react'
import s from './ProductsPage.module.scss'
import cls from 'classnames'
import { ProductsTable } from 'pages/Private/Products/ProductsTable/ProductsTable'
import { useAppDispatch, useAppSelector } from 'app/store/types'
import { getDate } from 'shared/helpers/date/getDate'
import { AdvancedSearch, Button } from 'components'
import { searchByIncludes } from 'shared/helpers/filters/search'
import { clearFilters } from 'app/store/slices/productsFilters/productsFilters'
import { Modal } from 'components/Modal/Modal'
import { CreateProductForm } from './CreateProductForm/CreateProductForm'
import { SideButton } from 'components/SideButton'
import { FilterMenu } from './FilterMenu/FilterMenu'

const ProductsPage: FC = () => {
    const dispatch = useAppDispatch()
    const { queryString, filters } = useAppSelector(
        state => state.productsFilters
    )
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const productsData = useAppSelector(state => state.products.data.items)
    const categories = useAppSelector(state => state.products.data)
    const filtredProductsData = useAppSelector(
        state => state.products.data.filtredItems
    )
    const filtredItems = searchByIncludes(
        filtredProductsData ? filtredProductsData : productsData,
        searchValue
    )
    const date = getDate()

    const onClear = () => {
        dispatch(clearFilters())
        setSearchValue('')
        setFilterIsOpen(false)
    }

    if (!categories.categories) {
        return <div>...loading</div>
    }

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
                    canClear={!!searchValue || !!filters}
                    isOpened={filterIsOpen}
                    onClear={() => onClear()}
                >
                    <FilterMenu onClose={() => setFilterIsOpen(false)} />
                </AdvancedSearch>
                <Button
                    onClick={() => setModalIsOpen(true)}
                    variant={'rounded'}
                >
                    Add new product
                </Button>
                <p
                    className={s.date}
                >{`${date.mounth} ${date.number}, ${date.year}`}</p>
            </div>
            <ProductsTable items={filtredItems} className={s.table} />
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <CreateProductForm />
            </Modal>
        </div>
    )
}

export default ProductsPage
