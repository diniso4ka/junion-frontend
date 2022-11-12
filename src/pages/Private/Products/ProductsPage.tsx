import { FC } from 'react'
import s from './ProductsPage.module.scss'
import cls from 'classnames'
import { ProductsTable } from 'features/ProductsTable/ProductsTable'
import { useAppSelector } from 'app/store/types'

const ProductsPage: FC = () => {
    const productsData = useAppSelector(state => state.products.data.items)
    return (
        <div className={cls(s.ProductsPage)}>
            <ProductsTable items={productsData} className={s.table} />
        </div>
    )
}

export default ProductsPage
