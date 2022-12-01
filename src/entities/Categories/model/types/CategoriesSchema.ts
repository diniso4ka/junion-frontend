export interface CategoriesSchema {
    items?: Category[]
    quantity: number
    isLoading: boolean
    error?: boolean
}

export interface Category {
    _id: string
    quantity: number
}
