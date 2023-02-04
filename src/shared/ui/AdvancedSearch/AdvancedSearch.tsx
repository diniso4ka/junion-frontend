import cls from 'classnames';
import React, {
	FC,
	InputHTMLAttributes,
	ReactNode,
	useRef,
	useState,
} from 'react';

import { useClickOutside } from '../../hooks/useClickOutside';

import deleteIcon from 'shared/assets/images/icons/delete.svg';
import moreIcon from 'shared/assets/images/icons/more.svg';
import searchIcon from 'shared/assets/images/icons/search.svg';

import s from './AdvancedSearch.module.scss';

interface AdvancedSearchProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	children?: ReactNode;
	advanced?: boolean;
	isOpened?: boolean;
	onClick?: (e) => void;
	onChange?: (e) => void;
	onOpen?: () => void;
	onClose?: () => void;
	onToggleOpen?: () => void;
	onClear?: () => void;
	canClear?: boolean;
	value?: string;
}

export const AdvancedSearch: FC<AdvancedSearchProps> = ({
	className,
	children,
	advanced = false,
	isOpened,
	onClick,
	onOpen,
	onClose,
	onToggleOpen,
	onClear,
	canClear,
	onChange,
	value,
	...rest
}) => {
	const ref = useRef(null);
	useClickOutside(ref, () => onClose?.());
	return (
		<div ref={ref} onClick={onClick} className={cls(s.wrapper, className)}>
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={s.input}
				{...rest}
			/>
			<div
				className={cls(s.children, {
					[s.opened]: isOpened,
					[s.hidden]: !isOpened,
				})}
			>
				{children}
			</div>
			<img className={cls(s.helperIcon, s.helperIconLeft)} src={searchIcon} />
			{advanced && (
				<img
					className={cls(s.helperIcon, s.helperIconRight, {
						[s.active]: isOpened,
					})}
					src={moreIcon}
					onClick={() => onToggleOpen?.()}
				/>
			)}
			{canClear && (
				<img
					className={cls(s.helperIcon, s.closeIcon, {
						[s.helperSecondIconLeft]: advanced,
						[s.helperIconRight]: !advanced,
					})}
					src={deleteIcon}
					onClick={onClear}
				/>
			)}
		</div>
	);
};
