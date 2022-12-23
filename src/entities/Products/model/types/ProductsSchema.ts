export interface ProductsSchema {
    items: ProductType[]
    filteredItems: ProductType[]
    sortedItems: ProductType[]
    sortedBy: ProductSortedBy
    quantity: number
    isLoading: boolean
    error?: boolean
}

export interface ProductType {
    art: string
    category: string[]
    discountPrice: number
    name: string
    owner: string
    price: number
    unit: string
    quantity: number
    updatedAt: string
    createdAt: string
    vendor: string
    _id: string
    status: string
}

export interface ProductSortedBy {
    sort?: ProductSort
    type?: ProductSortType
}

export enum ProductSort {
    ASC = 'asc',
    DESC = 'desc',
}

export enum ProductSortType {
    PRODUCT_CODE = 'PRODUCT_CODE',
    PRODUCT_CATEGORY = 'PRODUCT_CATEGORY',
    PRODUCT_NAME = 'PRODUCT_NAME',
    PRODUCT_PRICE = 'PRODUCT_PRICE',
    PRODUCT_QUANTITY = 'PRODUCT_QUANTITY',
    PRODUCT_UNIT = 'PRODUCT_UNIT',
}
