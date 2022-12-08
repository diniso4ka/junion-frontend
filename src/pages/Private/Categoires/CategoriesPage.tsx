import { FC, useState } from 'react'
import s from './CategoriesPage.module.scss'
import { getDate } from 'shared/helpers/date/getDate'
import { AdvancedSearch, Text } from 'shared/ui'
import { CategoriesTable } from 'entities/Categories/ui/CategoriesTable/CategoriesTable'
import { useAppSelector } from 'app/store/config/StateSchema'
import { getCategoryList } from 'entities/Categories'

const CategoriesPage: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const categories = useAppSelector(getCategoryList)
    const date = getDate()
    const filteredItems = categories.filter(item =>
        item._id.toLowerCase().includes(searchValue.toLowerCase())
    )
    const onHandleClear = () => {
        setSearchValue('')
    }

    return (
        <div className={s.CategoriesPage}>
            <div className={s.navigation}>
                <Text className={s.title} title='Categories' />
                <AdvancedSearch
                    value={searchValue}
                    onChange={e => setSearchValue(e)}
                    onClick={e => e.stopPropagation()}
                    canClear={!!searchValue}
                    onClear={onHandleClear}
                ></AdvancedSearch>
                <Text
                    className={s.date}
                    date={`${date.mounth} ${date.number}, ${date.year}`}
                />
            </div>
            <CategoriesTable items={filteredItems} />
        </div>
    )
}

export default CategoriesPage
