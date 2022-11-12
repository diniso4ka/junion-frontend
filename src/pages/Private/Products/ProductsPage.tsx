import { FC } from 'react'
import s from './ProductsPage.module.scss'
import cls from 'classnames'
import { ProductsTable } from 'features/ProductsTable/ProductsTable'
import { useAppSelector } from 'app/store/types'
import { getDate } from '../../../shared/helpers/date/getDate'

const ProductsPage: FC = () => {
    const productsData = useAppSelector(state => state.products.data.items)
    const date = getDate()

    return (
        <div className={cls(s.ProductsPage)}>
            <div>
                <p
                    className={s.date}
                >{`${date.mounth} ${date.number}, ${date.year}`}</p>
            </div>
            <ProductsTable items={productsData} className={s.table} />
        </div>
    )
}

export default ProductsPage
