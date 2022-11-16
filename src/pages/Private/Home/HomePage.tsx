import React, { useEffect } from 'react'
import cls from 'classnames'
import s from './HomePage.module.scss'
import { List } from 'components'
import { getDate } from 'shared/helpers/date/getDate'
import { useAppSelector } from 'app/store/types'

const HomePage: React.FC = () => {
    const products = useAppSelector(state => state.products.data)
    const status = useAppSelector(state => state.products.status)
    const tablesData = {
        products: {
            title: 'Product information:',
            items: [
                {
                    label: 'Products in the store:',
                    value: `${products.quantity}`,
                },
                {
                    label: 'Products without price:',
                    value: `${
                        products.items.filter(item => !item.price).length
                    }`,
                },
                {
                    label: 'Products without category:',
                    value: `${
                        products.items.filter(item => !item.category).length
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
                    isLoading={status === 'loading'}
                    data={tablesData.products}
                    className={s.item}
                />
                <List
                    isLoading={status === 'loading'}
                    data={tablesData.employee}
                    className={s.item}
                />
            </div>
        </div>
    )
}

export default HomePage
