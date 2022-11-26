import { FC } from 'react'
import s from './CategoriesPage.module.scss'
import { getDate } from 'shared/helpers/date/getDate'
import { Search } from 'components'

const CategoriesPage: FC = () => {
    const date = getDate()

    return (
        <div className={s.CategoriesPage}>
            <div className={s.navigation}>
                <h1>Categories</h1>
                <Search
                    type={'hint'}
                    className={s.search}
                    data={[
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                        'rere',
                    ]}
                />
                <p className={s.date}>
                    {`${date.mounth} ${date.number}, ${date.year}`}
                </p>
            </div>
        </div>
    )
}

export default CategoriesPage
