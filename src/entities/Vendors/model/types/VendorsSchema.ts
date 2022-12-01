export interface VendorsSchema {
    items?: Vendor[]
    quantity: number
    isLoading: boolean
    error?: boolean
}

export interface Vendor {
    address: string
    code: string
    createdAt: string
    name: string
    owner: string
    regCode: string
    updatedAt: string
    _id: string
}
