import { FC, useState } from 'react'
import cls from 'classnames'
import s from './HomePage.module.scss'
import { List } from 'shared/ui'
import { getDate } from 'shared/helpers/date/getDate'
import { useAppDispatch, useAppSelector } from 'app/store/types'
import {
    getProductsList,
    getProductsQuantity,
    getProductsStatus,
    productsActions,
} from 'entities/Products'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { FilteredList } from '../../../entities/Products/ui/FilteredList/FilteredList'
import { getSortedProductsList } from '../../../entities/Products/model/selectors/getSortedProductsList/getSortedProductsList'
import { dispatch } from 'jest-circus/build/state'
import { useNavigate } from 'react-router'

const HomePage: FC = () => {
    const [listIsOpen, setListIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const productsList = useAppSelector(getProductsList)
    const sortedProductsList = useAppSelector(getSortedProductsList)
    const productsQuantity = useAppSelector(getProductsQuantity)
    const productsStatus = useAppSelector(getProductsStatus)

    const tablesData = {
        products: {
            title: 'Product information:',
            items: [
                {
                    label: 'Products in the store:',
                    value: `${productsQuantity}`,
                    link: routeConfig.PRODUCTS,
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

    const onHandleClose = () => {
        setListIsOpen(false)
    }
    const onHandleOpen = action => {
        if (action.includes('price')) {
            dispatch(productsActions.setSortWithoutPrice())
            onHandleClose()
            setTitle(action)
            setListIsOpen(true)
        } else if (action.includes('category')) {
            dispatch(productsActions.setSortWithoutCategory())
            setTitle(action)
            setListIsOpen(true)
        } else if (action.includes('store')) {
            navigate(routeConfig.PRODUCTS)
        }
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
                    onClick={onHandleOpen}
                />
                <List
                    isLoading={productsStatus}
                    data={tablesData.employee}
                    className={s.item}
                />
            </div>
            <FilteredList
                title={title}
                data={sortedProductsList}
                isOpen={listIsOpen}
                onClose={onHandleClose}
            />
        </div>
    )
}

export default HomePage
