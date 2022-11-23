import { FC, useState } from 'react'
import s from './ProductsPage.module.scss'
import cls from 'classnames'
import { ProductsTable } from 'pages/Private/Products/ProductsTable/ProductsTable'
import { useAppSelector } from 'app/store/types'
import { getDate } from 'shared/helpers/date/getDate'
import { Button, Search } from 'components'
import { searchByIncludes } from 'shared/helpers/filters/search'

const ProductsPage: FC = () => {
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

    if (!categories.categories) {
        return <div>...loading</div>
    }
    return (
        <div
            className={cls(s.ProductsPage)}
            onClick={() => setFilterIsOpen(false)}
        >
            <div className={s.navigation}>
                <h1>Products</h1>
                <Search
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    className={s.search}
                    onFilterOpen={() => setFilterIsOpen(!filterIsOpen)}
                    isOpened={filterIsOpen}
                    onClick={e => e.stopPropagation()}
                />
                <Button variant={'rounded'}>Add new product</Button>
                <p
                    className={s.date}
                >{`${date.mounth} ${date.number}, ${date.year}`}</p>
            </div>
            <ProductsTable items={filtredItems} className={s.table} />
        </div>
    )
}

export default ProductsPage
