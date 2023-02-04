import { formattedDate } from 'shared/helpers/date/formattedDate';

import { SortType } from '../types/sort';

export function sortProducts(state, type) {
	if (!type) {
		return { items: [], type: SortType.NONE };
	}
	const filteredList = state.filter((item) => item.status !== 'deleted');
	switch (type) {
		case SortType.WITHOUT_QUANTITY:
			return {
				items: filteredList.filter((item) => !item.quantity),
				type: SortType.WITHOUT_QUANTITY,
			};
		case SortType.WITHOUT_PRICE:
			return {
				items: filteredList.filter((item) => !item.price),
				type: SortType.WITHOUT_PRICE,
			};
		case SortType.DELETED_TODAY:
			return {
				items: state.filter(
					(item) =>
						item.status === 'deleted' &&
						formattedDate() === item.updatedAt.split('').splice(0, 10).join(''),
				),
				type: SortType.DELETED_TODAY,
			};
		case SortType.WITHOUT_CATEGORY:
			return {
				items: filteredList.filter((item) => item.category[0] === 'unSorted'),
				type: SortType.WITHOUT_CATEGORY,
			};
		case SortType.ADDED_TODAY:
			return {
				items: filteredList.filter(
					(item) =>
						formattedDate() === item.createdAt.split('').splice(0, 10).join(''),
				),
				type: SortType.ADDED_TODAY,
			};
	}
}
