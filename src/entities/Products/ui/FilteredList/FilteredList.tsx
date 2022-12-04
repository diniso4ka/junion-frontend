import { FC } from 'react'
import s from './FilteredList.module.scss'
import cls from 'classnames'
import { Text } from 'shared/ui'
import { ProductType } from '../../model/types/ProductsSchema'
import closeIcon from 'shared/assets/images/icons/close.svg'

interface FilteredListProps {
    className?: string
    title: string
    data: ProductType[]
    isOpen: boolean
    onClose: () => void
}

export const FilteredList: FC<FilteredListProps> = ({
    className,
    data,
    isOpen,
    onClose,
    title,
}) => {
    return (
        <div
            className={cls(s.FilteredList, className, {
                [s.opened]: isOpen,
            })}
        >
            <img onClick={onClose} className={s.closeIcon} src={closeIcon} />
            <div className={s.table}>
                <Text className={s.title} title={title} />
                <div className={s.heading}>
                    <Text className={s.subtitle} mediumText={'Code'} />
                    <Text className={s.subtitle} mediumText={'Category'} />
                    <Text className={s.subtitle} mediumText={'Name'} />
                    <Text className={s.subtitle} mediumText={'Price,$'} />
                    <Text className={s.subtitle} mediumText={'Quantity'} />
                    <Text className={s.subtitle} mediumText={'Owner'} />
                </div>
                <div className={s.items}>
                    {!data.length && <Text subtitle={'List is clear'} />}
                    {data &&
                        data.map(item => (
                            <div className={s.row}>
                                <Text text={item.art ? item.art : 'none'} />
                                <Text text={item.category[0]} />
                                <Text text={item.name} />
                                <Text text={item.price.toString()} />
                                <Text text={item.quantity.toString()} />
                                <Text text={item.owner} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
