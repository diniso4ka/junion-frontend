import { FC, useEffect, useState } from 'react'
import cls from 'classnames'
import s from './HomePage.module.scss'
import { Button, List, Text } from 'shared/ui'
import { getDate } from 'shared/helpers/date/getDate'
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema'
import {
    getProductsList,
    getProductsQuantity,
    getProductsStatus,
} from 'entities/Products'
import { FilteredList } from 'entities/Products/ui/FilteredList/FilteredList'
import { useNavigate } from 'react-router'
import { getProductsInitialize } from '../../../entities/Products/model/selectors/getProductsInitialize/getProductsInitialize'
import { getUpdateProductSelectedList } from '../../../features/UpdateProduct/model/selectors/getUpdateProductSelectedList/getUpdateProductSelectedList'
import { thunkDeleteProduct } from '../../../features/UpdateProduct/model/services/thunkDeleteProduct'
import { SideButton } from '../../../shared/ui/SideButton'
import { getProductsAllList } from '../../../entities/Products/model/selectors/getProductsAllList/getProductsAllList'
import { sortProducts } from './model/services/sort'
import { SortType } from './model/types/sort'
import { ConfirmModal } from '../../../features/UpdateProduct/ui/ConfirmModal/ConfirmModal'

const HomePage: FC = () => {
    const [listIsOpen, setListIsOpen] = useState<boolean>(false)
    const [changeModalIsOpen, setChangeModalIsOpen] = useState<boolean>(false)
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const productsList = useAppSelector(getProductsList)
    const allProductsList = useAppSelector(getProductsAllList)
    const productInitialize = useAppSelector(getProductsInitialize)
    const productsQuantity = useAppSelector(getProductsQuantity)
    const productsStatus = useAppSelector(getProductsStatus)
    const selectedItems = useAppSelector(getUpdateProductSelectedList)

    const [selectedSort, setSelectedSort] = useState({
        type: SortType.NONE,
        items: [],
    })
    const tablesData = {
        products: {
            title: 'Product information:',
            items: [
                {
                    label: 'Products without quantity:',
                    value: `${
                        sortProducts(productsList, SortType.WITHOUT_QUANTITY)
                            .items.length
                    }`,
                    type: SortType.WITHOUT_QUANTITY,
                },
                {
                    label: 'Products without price:',
                    value: `${
                        sortProducts(productsList, SortType.WITHOUT_PRICE).items
                            .length
                    }`,
                    type: SortType.WITHOUT_PRICE,
                },
                {
                    label: 'Products without category:',
                    value: `${
                        sortProducts(productsList, SortType.WITHOUT_CATEGORY)
                            .items.length
                    }`,
                    type: SortType.WITHOUT_CATEGORY,
                },
            ],
        },
        employee: {
            title: 'Users information:',
            items: [
                { label: 'All users:', value: 'NR', type: SortType.NONE },
                {
                    label: 'Products added today:',
                    value: `${
                        sortProducts(productsList, SortType.ADDED_TODAY).items
                            .length
                    }`,
                    type: SortType.ADDED_TODAY,
                },
                {
                    label: 'Products deleted today:',
                    value: `${
                        sortProducts(allProductsList, SortType.DELETED_TODAY)
                            .items.length
                    }`,
                    type: SortType.DELETED_TODAY,
                },
            ],
        },
    }

    const onHandleClose = () => {
        setListIsOpen(false)
    }
    const onHandleOpen = (action, title, open) => {
        setSelectedSort(sortProducts(productsList, action))
        setTitle(action)
        if (open) {
            setListIsOpen(true)
        }
    }

    const onHandleDelete = () => {
        selectedItems.forEach(item => {
            dispatch(thunkDeleteProduct(item._id))
        })
        setConfirmModalIsOpen(false)
    }

    useEffect(() => {
        if (productsStatus === false) {
            onHandleOpen(SortType.WITHOUT_PRICE, title, false)
        }
    }, [productsStatus])

    useEffect(() => {
        if (selectedSort.items.length) {
            setSelectedSort(sortProducts(productsList, selectedSort.type))
        }
    }, [productsList])

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
                        data={selectedSort}
                        isOpen={listIsOpen}
                        onClose={onHandleClose}
                        variant={
                            selectedSort?.type === SortType.WITHOUT_PRICE
                                ? 'price'
                                : 'category'
                        }
                        modalIsOpen={changeModalIsOpen}
                        modalOnClose={() => setChangeModalIsOpen(false)}
                    />
                )}
                {confirmModalIsOpen && (
                    <ConfirmModal
                        onClose={() => setConfirmModalIsOpen(false)}
                        isOpen={confirmModalIsOpen}
                        onConfirm={onHandleDelete}
                    />
                )}
            </div>
            {!(selectedItems.length < 1) && (
                <div className={s.btns}>
                    <SideButton
                        variant='update'
                        className={s.update}
                        disable={selectedItems.length !== 1}
                        onClick={() => setChangeModalIsOpen(true)}
                        active={changeModalIsOpen}
                    />
                    <SideButton
                        disable={selectedItems.length < 1}
                        variant='delete'
                        className={s.delete}
                        onClick={() => setConfirmModalIsOpen(true)}
                        active={confirmModalIsOpen}
                    />
                </div>
            )}
        </div>
    )
}

export default HomePage
