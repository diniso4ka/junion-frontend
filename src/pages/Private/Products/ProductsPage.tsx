import { FC, useEffect, useState } from 'react'
import s from './ProductsPage.module.scss'
import cls from 'classnames'
import { ProductsTable } from 'features/ProductsTable/ProductsTable'
import { useAppDispatch, useAppSelector } from 'app/store/types'
import { getDate } from 'shared/helpers/date/getDate'
import { Button, Search } from 'components'
import { searchByIncludes } from 'shared/helpers/filters/search'
import { useNavigate } from 'react-router'

const ProductsPage: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useAppSelector(state => state.filters.queryParams)
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const productsData = useAppSelector(state => state.products.data.items)
    const filtredItems = searchByIncludes(productsData, searchValue)
    const date = getDate()

    useEffect(() => {
        navigate(`?${params}`)
    }, [params])

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
