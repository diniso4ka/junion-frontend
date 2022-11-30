import { UnitType } from './unit'

export interface ICreateProduct {
    name: string
    price?: number
    quantity?: number
    unit?: UnitType
    category?: string
    discountPrice?: number
    vendor?: string
}
