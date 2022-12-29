import { ProductType } from '../../../../../entities/Products/model/types/ProductsSchema'

export interface Sort {
    selectedSort: number
    withoutPrice: ProductType[]
    withoutCategory: ProductType[]
    withoutQuantity: ProductType[]
    addedToday: ProductType[]
    deletedToday: ProductType[]
    sortType: SortType
}

export enum SortType {
    WITHOUT_PRICE = 'Products without price',
    WITHOUT_QUANTITY = 'Products without quantity',
    WITHOUT_CATEGORY = 'Products without category',
    ADDED_TODAY = 'Products added today',
    DELETED_TODAY = 'Products deleted today',
    NONE = 'none',
}
