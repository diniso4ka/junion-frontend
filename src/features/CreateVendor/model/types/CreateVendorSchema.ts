export interface CreateVendorSchema {
    form: CreateVendorForm
    isLoading: boolean
    error?: boolean
}

export interface CreateVendorForm {
    name: string
    regCode: string
    address: string
}
