export interface ProductsSchema {
    items?: ProductType[]
    quantity: number
    isLoading: boolean
    error?: boolean
}

export interface ProductType {
    art: string
    category: string[]
    createdAt: string
    discountPrice: number
    name: string
    owner: string
    price: number
    quantity: number
    updatedAt: string
    vendor: string
    _id: string
}
