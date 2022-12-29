import { FC, useEffect, useState } from 'react'
import s from './CategoriesPage.module.scss'
import { getDate } from 'shared/helpers/date/getDate'
import { AdvancedSearch, Text } from 'shared/ui'
import { CategoriesTable } from 'entities/Categories/ui/CategoriesTable/CategoriesTable'
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'
import { categoriesActions, getCategoryList } from 'entities/Categories'
import { getCategoryFilteredList } from 'entities/Categories'
import { SideButton } from '../../../shared/ui/SideButton'

const CategoriesPage: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const categories = useAppSelector(getCategoryList)
    const filteredCategories = useAppSelector(getCategoryFilteredList)
    const dispatch = useAppDispatch()
    const date = getDate()
    const filteredItems = filteredCategories
        ? filteredCategories.filter(item =>
              item._id.toLowerCase().includes(searchValue.toLowerCase())
          )
        : categories.filter(item =>
              item._id.toLowerCase().includes(searchValue.toLowerCase())
          )
    const onHandleClear = () => {
        setSearchValue('')
    }

    useEffect(() => {
        return () => {
            dispatch(categoriesActions.clearSort())
        }
    }, [])
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
