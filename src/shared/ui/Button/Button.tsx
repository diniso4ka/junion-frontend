import cls from 'classnames';
import React, { ButtonHTMLAttributes, FC, memo } from 'react';

import { useAppSelector } from '../../../app/store';
import { getAuthData } from '../../../entities/User';
import { Preloader } from '../Preloader/Preloader';

import s from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	type?: 'button' | 'submit';
	variant?: 'primary' | 'secondary' | 'rounded' | 'outline' | 'text' | 'hint';
	theme?: 'darkGrey' | 'lightGrey' | 'purple' | 'orange';
	size?: 'large' | 'medium' | 'small';
	isLoading?: boolean;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
}

export const Button = memo(
	({
		children,
		type = 'button',
		variant = 'primary',
		theme = 'darkGrey',
		size = 'medium',
		className,
		onClick,
		isLoading,
		disabled,
		...rest
	}: IButtonProps) => {
		const onToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			onClick?.();
		};
		const isTestAccount = useAppSelector(getAuthData);
		const disable = isTestAccount.name === 'Test' || disabled;
		const classnames = cls(s.button, s[variant], s[theme], s[size], className, {
			[s.disabled]: isLoading || disable,
		});

		return (
			<button
				disabled={isLoading || disable}
				type={type}
				className={classnames}
				onClick={(e) => onToggleClick(e)}
				{...rest}
			>
				{isLoading ? <Preloader /> : children}
			</button>
		);
	},
);
