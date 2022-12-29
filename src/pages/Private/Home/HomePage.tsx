import { FC, useEffect, useState } from 'react'
import cls from 'classnames'
import s from './HomePage.module.scss'
import { Button, List, Text } from 'shared/ui'
import { getDate } from 'shared/helpers/date/getDate'
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'
import { getProductsQuantity, getProductsStatus } from 'entities/Products'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { FilteredList } from 'entities/Products/ui/FilteredList/FilteredList'
import { getSortedProductsList } from 'entities/Products/model/selectors/getSortedProductsList/getSortedProductsList'
import { useNavigate } from 'react-router'
import { getSortedProductsInitialize } from '../../../entities/Products/model/selectors/getSortedProductsInitialize/getSortedProductsInitialize'
import { getUpdateProductSelectedList } from '../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList'
import { thunkDeleteProduct } from '../../../features/UpdateProduct/model/services/thunkDeleteProduct'
import { SideButton } from '../../../shared/ui/SideButton'

const HomePage: FC = () => {
    const [listIsOpen, setListIsOpen] = useState<boolean>(false)
    const [changeModalIsOpen, setChangeModalIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const sortedProductsList = useAppSelector(getSortedProductsList)
    const productInitialize = useAppSelector(getSortedProductsInitialize)
    const productsQuantity = useAppSelector(getProductsQuantity)
    const productsStatus = useAppSelector(getProductsStatus)
    const selectedItems = useAppSelector(getUpdateProductSelectedList)

    const [selectedSort, setSelectedSort] = useState({
        id: 0,
        items: [],
    })
    const tablesData = {
        products: {
            title: 'Product information:',
            items: [
                {
                    label: 'Products without quantity:',
                    value: `${sortedProductsList.withoutQuantity.length}`,
                    link: routeConfig.PRODUCTS,
                },
                {
                    label: 'Products without price:',
                    value: `${sortedProductsList.withoutPrice.length}`,
                },
                {
                    label: 'Products without category:',
                    value: `${sortedProductsList.withoutCategory.length}`,
                },
            ],
        },
        employee: {
            title: 'Users information:',
            items: [
                { label: 'All users:', value: 'NR' },
                {
                    label: 'Products added today:',
                    value: `${sortedProductsList.addedToday.length}`,
                },
                {
                    label: 'Products deleted today:',
                    value: `${sortedProductsList.deletedToday.length}`,
                },
            ],
        },
    }

    const onHandleClose = () => {
        setListIsOpen(false)
    }
    const onHandleOpen = (action, open) => {
        if (action.includes('price')) {
            setSelectedSort({ id: 0, items: sortedProductsList.withoutPrice })
            setTitle(action)
        } else if (action.includes('quantity')) {
            setSelectedSort({
                id: 1,
                items: sortedProductsList.withoutQuantity,
            })
            setTitle(action)
        } else if (action.includes('category')) {
            setSelectedSort({
                id: 2,
                items: sortedProductsList.withoutCategory,
            })
            setTitle(action)
        } else if (action.includes('added')) {
            setSelectedSort({ id: 3, items: sortedProductsList.addedToday })
            setTitle(action)
        } else if (action.includes('deleted')) {
            setSelectedSort({ id: 4, items: sortedProductsList.deletedToday })
            setTitle(action)
        } else if (action.includes('store')) {
            navigate(routeConfig.PRODUCTS)
        }
        if (open) {
            setListIsOpen(true)
        }
    }

    const onHandleDelete = () => {
        selectedItems.forEach(item => {
            dispatch(thunkDeleteProduct(item._id))
        })
    }

    useEffect(() => {
        if (productsStatus === false) {
            onHandleOpen(title, false)
        }
    }, [productsStatus])

    const date = getDate()

    return (
        <div className={s.overlay}>
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
                            isLoading={!productInitialize}
                            data={tablesData.products}
                            className={s.item}
                            onClick={onHandleOpen}
                            isOpen={listIsOpen}
                            titleCount={`${productsQuantity}`}
                            title={title}
                        />
                        <List
                            isLoading={!productInitialize}
                            data={tablesData.employee}
                            className={s.item}
                            onClick={onHandleOpen}
                            isOpen={listIsOpen}
                            title={title}
                        />
                    </div>
                    {listIsOpen && (
                        <FilteredList
                            title={title}
                            data={selectedSort.items}
                            isOpen={listIsOpen}
                            onClose={onHandleClose}
                            variant={
                                selectedSort.id === 2 ? 'category' : 'price'
                            }
                            modalIsOpen={changeModalIsOpen}
                            modalOnClose={() => setChangeModalIsOpen(false)}
                        />
                    )}
                </div>
            </div>
            <div className={s.btns}>
                <SideButton variant='update' className={s.update} />
                <SideButton variant='delete' className={s.delete} />
            </div>
        </div>
    )
}

export default HomePage
