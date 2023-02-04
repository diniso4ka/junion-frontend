import cls from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

import { useAppSelector } from '../../../app/store';
import { getAuthData } from '../../../entities/User';

import { ReactComponent as Pencil } from 'shared/assets/images/icons/pencil.svg';
import { ReactComponent as Trashcan } from 'shared/assets/images/icons/trashcan.svg';

import s from './SideButton.module.scss';

interface ISideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'delete' | 'update';
	isLoading?: boolean;
	className?: string;
	onClick?: () => void;
	disable?: boolean;
	active?: boolean;
}

export const SideButton = React.memo(
	({
		className,
		onClick,
		variant,
		isLoading,
		disable,
		active,
		...rest
	}: ISideButtonProps) => {
		const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			onClick?.();
		};
		const isTestAccount = useAppSelector(getAuthData);
		const disabled = isTestAccount?.name === 'Test' || disable;
		const classnames = cls(s.button, className, {
			[s.disabled]: isLoading || disabled,
			[s.active]: active,
		});
		return (
			<button
				disabled={isLoading || disabled}
				type='button'
				title={variant}
				className={classnames}
				onClick={(e) => onToggleClick(e)}
				{...rest}
			>
				<div>{variant === 'delete' ? <Trashcan /> : <Pencil />}</div>
			</button>
		);
	},
);
