export interface VendorsSchema {
    items?: []
    quantity: number
    isLoading: boolean
    error?: boolean
}

export interface Vendor {
    _id: string
    quantity: number
}
