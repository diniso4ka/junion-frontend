import { FC } from 'react'
import s from './VendorsPage.module.scss'
import cls from 'classnames'

const VendorsPage: FC = () => {
    return <div className={cls(s.VendorsPage, s.wrapper)}>Vendors</div>
}

export default VendorsPage
