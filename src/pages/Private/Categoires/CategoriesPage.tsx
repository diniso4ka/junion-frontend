import { FC } from 'react'
import s from './CategoriesPage.module.scss'
import { getDate } from 'shared/helpers/date/getDate'
import { AdvancedSearch } from 'shared/ui'

const CategoriesPage: FC = () => {
    const date = getDate()

    return (
        <div className={s.CategoriesPage}>
            <div className={s.navigation}>
                <h1>Categories</h1>
                <AdvancedSearch></AdvancedSearch>
                <p className={s.date}>
                    {`${date.mounth} ${date.number}, ${date.year}`}
                </p>
            </div>
        </div>
    )
}

export default CategoriesPage
