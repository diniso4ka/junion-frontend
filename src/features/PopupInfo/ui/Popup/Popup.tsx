import cls from 'classnames';

import { useAppSelector } from 'app/store';
import { Portal } from 'shared/ui/Portal/Portal';
import { Text } from 'shared/ui/Text/Text';

import { getPopupInfo } from '../../model/selectors/getPopupInfo/getPopupInfo';

import { ReactComponent as ErrorIcon } from 'shared/assets/images/icons/delete.svg';
import { ReactComponent as CompleteIcon } from 'shared/assets/images/icons/true.svg';

import s from './Popup.module.scss';

export const Popup = () => {
	const { type, text } = useAppSelector(getPopupInfo);
	const Icon = type === 'success' ? CompleteIcon : ErrorIcon;

	return (
		<Portal>
			<div className={s.wrapper}>
				<Text className={s.text} subtitle={text} />
				<Icon className={cls(s.icon, { [s.error]: type === 'error' })} />
			</div>
		</Portal>
	);
};
