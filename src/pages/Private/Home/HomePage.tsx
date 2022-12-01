import React from 'react'
import cls from 'classnames'
import s from './HomePage.module.scss'
import { List } from 'shared/ui'
import { getDate } from 'shared/helpers/date/getDate'
import { useAppSelector } from 'app/store/types'
import {
    getProductsList,
    getProductsQuantity,
    getProductsStatus,
} from 'entities/Products'

const HomePage: React.FC = () => {
    const productsList = useAppSelector(getProductsList)
    const productsQuantity = useAppSelector(getProductsQuantity)
    const productsStatus = useAppSelector(getProductsStatus)
    const tablesData = {
        products: {
            title: 'Product information:',
            items: [
                {
                    label: 'Products in the store:',
                    value: `${productsQuantity}`,
                },
                {
                    label: 'Products without price:',
                    value: `${productsList.filter(item => !item.price).length}`,
                },
                {
                    label: 'Products without category:',
                    value: `${
                        productsList.filter(
                            item => item.category[0] === 'unSorted'
                        ).length
                    }`,
                },
            ],
        },
        employee: {
            title: 'Employee information:',
            items: [
                { label: 'Online now:', value: 'NR' },
                {
                    label: 'Products added today:',
                    value: 'NR',
                },
                {
                    label: 'Products removed today:',
                    value: 'NR',
                },
            ],
        },
    }

    const date = getDate()
    return (
        <div className={cls(s.HomePage, s.wrapper)}>
            <div className={s.information}>
                <h1>Information board</h1>
                <p>{`${date.mounth} ${date.number}, ${date.year}`}</p>
            </div>
            <div className={s.items}>
                <List
                    isLoading={productsStatus}
                    data={tablesData.products}
                    className={s.item}
                />
                <List
                    isLoading={productsStatus}
                    data={tablesData.employee}
                    className={s.item}
                />
            </div>
        </div>
    )
}

export default HomePage
