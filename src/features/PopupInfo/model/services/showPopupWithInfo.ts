import { AppDispatch } from 'app/store/config/store';

import { popupInfoActions } from '../slice/popupInfoSlice';

interface ShowPopupParams {
	dispatch: AppDispatch;
	unit: 'vendor' | 'product' | 'password';
	option: 'create' | 'delete' | 'update' | 'change';
	status?: number;
	fulfilledQty?: number;
	rejectedQty?: number;
}

let isOpen = false;

export const showPopupWithInfo = ({
	dispatch,
	status,
	unit,
	option,
	fulfilledQty,
	rejectedQty,
}: ShowPopupParams) => {
	if (isOpen) {
		return;
	}

	if (option !== 'delete') {
		if (status === 200 || status === 201) {
			dispatch(
				popupInfoActions.setPopupInfo({
					text: `${unit.slice(0, 1).toUpperCase() + unit.slice(1)}${
						option === 'update' ? 's' : ''
					} has been ${option}d`,
					type: 'success',
				}),
			);
		} else {
			dispatch(
				popupInfoActions.setPopupInfo({
					text: `Failed to ${option} a ${unit}`,
					type: 'error',
				}),
			);
		}
	}

	if (option === 'delete') {
		const ty = fulfilledQty > rejectedQty ? 'success' : 'error';

		const itemText = `${fulfilledQty === 1 ? 'item' : 'items'}`;
		const te = !rejectedQty
			? `${fulfilledQty} ${itemText} removed`
			: `${fulfilledQty} ${itemText} removed and ${rejectedQty} with an error`;

		dispatch(
			popupInfoActions.setPopupInfo({
				text: te,
				type: ty,
			}),
		);
	}

	isOpen = true;

	setTimeout(() => {
		dispatch(popupInfoActions.unmountPopup());
		isOpen = false;
	}, 2200);
};
