export interface ProductsSchema {
    items: ProductType[]
    filteredItems: ProductType[]
    sortedItems: ProductType[]
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
