import { FC } from 'react'
import s from './PageLoader.module.scss'
import cls from 'classnames'
import { Preloader } from 'shared/ui'

export const PageLoader: FC = () => {
    return (
        <div className={cls(s.PageLoader)}>
            <Preloader />
        </div>
    )
}
