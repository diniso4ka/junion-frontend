import { FC } from 'react'
import s from './PageLoader.module.scss'
import cls from 'classnames'
import { Preloader } from 'components'

export const PageLoader: FC = () => {
    return (
        <div className={cls(s.PageLoader)}>
            <Preloader />
        </div>
    )
}
