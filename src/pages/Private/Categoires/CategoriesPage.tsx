import { FC, useState } from 'react'
import s from './CategoriesPage.module.scss'
import cls from 'classnames'
import { ProductsTable } from 'pages/Private/Products/ProductsTable/ProductsTable'
import { useAppSelector } from 'app/store/types'
import { getDate } from 'shared/helpers/date/getDate'
import { Button, Search } from 'components'
import { searchByIncludes } from 'shared/helpers/filters/search'

const CategoriesPage: FC = () => {
    const date = getDate()

    return (
        <div className={s.CategoriesPage}>
            <div className={s.navigation}>
                <h1>Categories</h1>
                <Search className={s.search} />
                <p className={s.date}>
                    {`${date.mounth} ${date.number}, ${date.year}`}
                </p>
            </div>
        </div>
    )
}

export default CategoriesPage
