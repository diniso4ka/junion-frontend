import { SortType } from '../types/sort'

export function getListError(type) {
    if (!type) {
        return ''
    }
    switch (type) {
        case SortType.WITHOUT_QUANTITY:
            return 'Nothing products without quantity!'
        case SortType.WITHOUT_PRICE:
            return 'Nothing products without price!'
        case SortType.DELETED_TODAY:
            return 'Nothing deleted today!'
        case SortType.WITHOUT_CATEGORY:
            return 'Nothing products without category!'
        case SortType.ADDED_TODAY:
            return 'Nothing products added today!'
    }
}
