import { FC, useState } from 'react'
import cls from 'classnames'
import s from './HomePage.module.scss'
import { List, Text } from 'shared/ui'
import { getDate } from 'shared/helpers/date/getDate'
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'
import {
    getProductsList,
    getProductsQuantity,
    getProductsStatus,
    productsActions,
} from 'entities/Products'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { FilteredList } from 'entities/Products/ui/FilteredList/FilteredList'
import { getSortedProductsList } from 'entities/Products/model/selectors/getSortedProductsList/getSortedProductsList'
import { useNavigate } from 'react-router'
import { formattedDate } from 'shared/helpers/date/formattedDate'

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
                    value: `${
                        productsList.filter(
                            item =>
                                formattedDate() ===
                                item.createdAt.split('').splice(0, 10).join('')
                        ).length
                    }`,
                },
                {
                    label: 'Products removed today:',
                    value: `${
                        productsList.filter(
                            item =>
                                item.status === 'deleted' &&
                                formattedDate() ===
                                    item.updatedAt
                                        .split('')
                                        .splice(0, 10)
                                        .join('')
                        ).length
                    }`,
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
        } else if (action.includes('added')) {
            dispatch(productsActions.setSortAddedToday())
            setTitle(action)
            setListIsOpen(true)
        } else if (action.includes('removed')) {
            dispatch(productsActions.setSortDeletedToday())
            setTitle(action)
            setListIsOpen(true)
        } else if (action.includes('store')) {
            navigate(routeConfig.PRODUCTS)
        }
    }

    const date = getDate()
    return (
        <div className={s.wrapper}>
            <div className={cls(s.HomePage)}>
                <div className={s.information}>
                    <Text className={s.title} title='Information board' />
                    <Text
                        className={s.title}
                        date={`${date.mounth} ${date.number}, ${date.year}`}
                    />
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
                        onClick={onHandleOpen}
                    />
                </div>
                <FilteredList
                    title={title}
                    data={sortedProductsList}
                    isOpen={listIsOpen}
                    onClose={onHandleClose}
                />
            </div>
        </div>
    )
}

export default HomePage
