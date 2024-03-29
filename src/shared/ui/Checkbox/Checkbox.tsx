import cls from 'classnames';
import { memo } from 'react';

import { ProductType } from '../../../entities/Products/model/types/ProductsSchema';

import s from './Checkbox.module.scss';

interface CheckboxProps {
	className?: string;
	value: boolean;
	onClick?: () => ProductType | void;
	theme?: 'dark' | 'light';
}

export const Checkbox = memo(
	({ className, onClick, value, theme }: CheckboxProps) => {
		return (
			<label className={cls(s.label, className)}>
				<input
					onChange={() => '1'}
					onClick={onClick}
					checked={value}
					type='checkbox'
					className={s.real}
				/>
				<span
					className={cls(s.custom, {
						[s.dark]: theme === 'dark',
					})}
				></span>
			</label>
		);
	},
);
