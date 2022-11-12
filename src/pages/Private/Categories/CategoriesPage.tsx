import { FC } from 'react'
import s from './CategoriesPage.module.scss'
import cls from 'classnames'

const CategoriesPage: FC = () => {
    return <div className={cls(s.CategoriesPage, s.wrapper)}></div>
}

export default CategoriesPage
