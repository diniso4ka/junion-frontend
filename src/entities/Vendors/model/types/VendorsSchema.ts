export interface VendorsSchema {
    items?: Vendor[]
    filteredItems?: Vendor[]
    sortedBy?: VendorsSortedBy
    quantity?: number
    isLoading?: boolean
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

export interface VendorsSortedBy {
    sort?: VendorsSort
    type?: VendorsSortType
}

export enum VendorsSort {
    ASC = 'asc',
    DESC = 'desc',
}

export enum VendorsSortType {
    VENDOR_CODE = 'VENDOR_CODE',
    VENDOR_REG_CODE = 'VENDOR_REG_CODE',
    VENDOR_NAME = 'VENDOR_NAME',
}
